'use client'

import { useCallback, useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * Native booking widget — talks directly to Evolution Media's shared
 * booking API (GET /api/availability, POST /api/book), the same public,
 * CORS-open endpoints the hosted /book/[siteId] page itself uses. No
 * iframe, no redirect: a real component in this codebase, styled with
 * this site's own dark-editorial tokens (see AppointmentForm.tsx /
 * GownGrid.tsx for the conventions this borrows), that happens to
 * read/write a shared backend — same pattern bambinosv1 proves for CMS
 * content, applied here to booking data instead.
 *
 * Real-time slot availability + instant reservation, vs. AppointmentForm's
 * request-and-we'll-follow-up enquiry — see BookingSection.tsx for which
 * one is actually wired in.
 *
 * REI Bridal has exactly one service and one resource (see
 * evomedia-cms/scripts/provision-reibridal.ts), so this skips the
 * service/resource picker steps a multi-service site's widget would need
 * — just date, time, details, done.
 */

const API_BASE = process.env.NEXT_PUBLIC_BOOKING_API_BASE!
const SITE_ID = process.env.NEXT_PUBLIC_BOOKING_SITE_ID!
const SERVICE_ID = process.env.NEXT_PUBLIC_BOOKING_SERVICE_ID!

type Slot = { starts_at: string; time: string }
type Day = { date: string; slots: Slot[] }

/** "YYYY-MM-DD" + n days, calendar arithmetic only (no timezone drift). */
function addDaysYmd(ymd: string, n: number): string {
  const [y, m, d] = ymd.split('-').map(Number)
  const t = new Date(Date.UTC(y, m - 1, d + n))
  return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, '0')}-${String(t.getUTCDate()).padStart(2, '0')}`
}

function todayYmd(): string {
  const t = new Date()
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
}

// Matches AppointmentForm.tsx's own tokens exactly, for a form that
// reads as part of this site, not a bolted-on widget.
const inputClass =
  'w-full bg-transparent border-b border-ivory/20 focus:border-champagne py-3 text-sm font-light text-ivory placeholder:text-ivory/30 outline-none transition-colors'
const labelClass = 'block text-xs tracking-widest uppercase font-light text-ivory/50 mb-2'

export default function BridalBookingWidget() {
  const [days, setDays] = useState<Day[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [date, setDate] = useState<string | null>(null)
  const [slot, setSlot] = useState<Slot | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '', website: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [done, setDone] = useState<{ status: string; starts_at: string } | null>(null)

  // Shows the next 10 dates that actually have something free, however
  // far ahead — a fixed "next two weeks" window would show nothing to a
  // bride booking around a Tuesday–Saturday pattern with weeks between
  // her preferred days. Walks the horizon in 31-day pages until it has
  // enough or runs out (mirrors evomedia-cms's own BookingWidget).
  const load = useCallback(async () => {
    setLoading(true)
    setLoadError('')
    try {
      const found: Day[] = []
      const today = todayYmd()
      const fetchPage = async (from: string): Promise<Day[]> => {
        const q = new URLSearchParams({ site: SITE_ID, service: SERVICE_ID, from, days: '31' })
        const res = await fetch(`${API_BASE}/api/availability?${q}`)
        const data = await res.json()
        if (!data.ok) throw new Error('Could not load available times.')
        return data.days as Day[]
      }
      for (let page = 0; page < 6 && found.length < 10; page++) {
        const pageDays = await fetchPage(addDaysYmd(today, page * 31))
        let anySlots = false
        for (const d of pageDays) {
          if (d.slots.length > 0) {
            found.push(d)
            anySlots = true
          }
        }
        if (!anySlots && page > 0) break // a whole empty page past the horizon: stop
      }
      setDays(found.slice(0, 10))
      setDate((d) => d ?? found[0]?.date ?? null)
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : 'Could not load available times.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!slot) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch(`${API_BASE}/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site_id: SITE_ID,
          service_id: SERVICE_ID,
          starts_at: slot.starts_at,
          name: form.name,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
          website: form.website,
        }),
      })
      const data = await res.json()
      if (!data.ok) {
        setSubmitError(data.message ?? 'Something went wrong. Please try again.')
        if (data.code === 'slot_unavailable') {
          setSlot(null)
          await load()
        }
        return
      }
      setDone(data.booking)
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const dateLabel = (ymd: string) => {
    const [y, m, d] = ymd.split('-').map(Number)
    return new Intl.DateTimeFormat('en-IE', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(
      new Date(Date.UTC(y, m - 1, d))
    )
  }
  const dayParts = (ymd: string) => {
    const [y, m, d] = ymd.split('-').map(Number)
    const when = new Date(Date.UTC(y, m - 1, d))
    return {
      weekday: new Intl.DateTimeFormat('en-IE', { weekday: 'short', timeZone: 'UTC' }).format(when),
      day: d,
      month: new Intl.DateTimeFormat('en-IE', { month: 'short', timeZone: 'UTC' }).format(when),
    }
  }

  const selectedDay = days?.find((d) => d.date === date) ?? null

  // ---------------------------------------------------------------- done
  if (done) {
    const confirmed = done.status === 'confirmed'
    return (
      <div className="py-16 text-center" role="status">
        <span className="font-serif text-4xl text-champagne block mb-4">
          {confirmed ? 'You’re booked in' : 'Request received'}
        </span>
        <p className="font-sans font-light text-ivory/60 max-w-sm mx-auto leading-relaxed">
          {dateLabel(done.starts_at.slice(0, 10))} at{' '}
          {new Intl.DateTimeFormat('en-IE', { timeZone: 'Europe/Dublin', hour: '2-digit', minute: '2-digit', hour12: false }).format(
            new Date(done.starts_at)
          )}
          .
          {confirmed
            ? ` We’ve emailed a confirmation to ${form.email}.`
            : ` We’ll confirm shortly by email at ${form.email}.`}
        </p>
      </div>
    )
  }

  // -------------------------------------------------------------- loading
  if (loading && !days) {
    return (
      <div className="py-16 text-center">
        <span className="section-label">Checking availability…</span>
      </div>
    )
  }

  if (loadError || !days || days.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-serif text-xl text-ivory/50 mb-6 max-w-sm mx-auto leading-relaxed">
          {loadError || 'Nothing available online right now.'}
        </p>
        <a href={`mailto:${siteConfig.email}`} className="btn-filled">
          Email Us Directly
        </a>
      </div>
    )
  }

  // --------------------------------------------------------------- picker
  if (!slot) {
    return (
      <div>
        <span className="section-label mb-2 block">Step 1</span>
        <h3 className="font-serif text-2xl text-ivory mb-6">Choose a Date &amp; Time</h3>
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1">
          {days.map((d) => {
            const { weekday, day, month } = dayParts(d.date)
            const active = date === d.date
            return (
              <button
                key={d.date}
                type="button"
                onClick={() => setDate(d.date)}
                aria-pressed={active}
                className={
                  'flex w-16 shrink-0 flex-col items-center border py-3 font-sans transition-colors ' +
                  (active ? 'border-champagne text-champagne' : 'border-ivory/15 text-ivory/60 hover:border-champagne/50')
                }
              >
                <span className="text-[10px] uppercase tracking-widest">{weekday}</span>
                <span className="font-serif text-xl">{day}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-60">{month}</span>
              </button>
            )
          })}
        </div>
        {selectedDay && (
          <div className="mt-6">
            <p className="font-sans font-light text-sm text-ivory/50 mb-3">{dateLabel(selectedDay.date)}</p>
            <div className="flex flex-wrap gap-2">
              {selectedDay.slots.map((s) => (
                <button
                  key={s.starts_at}
                  type="button"
                  onClick={() => setSlot(s)}
                  className="border border-ivory/20 px-4 py-2 font-sans text-sm text-ivory transition-colors hover:border-champagne hover:text-champagne"
                >
                  {s.time}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // ---------------------------------------------------------------- details
  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <span className="section-label mb-2 block">Step 2</span>
        <h3 className="font-serif text-2xl text-ivory mb-1">Your Details</h3>
        <p className="font-sans font-light text-sm text-ivory/50">
          {dateLabel(date!)} at {slot.time}
          {'  '}
          <button type="button" onClick={() => setSlot(null)} className="ml-2 text-champagne underline">
            Change
          </button>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            required
            minLength={2}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div>
          <label className={labelClass}>Email Address *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>Phone Number</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputClass}
          placeholder="+353 ..."
          autoComplete="tel"
        />
      </div>
      <div>
        <label className={labelClass}>Your Wedding Date, Style Inspiration, Anything Else?</label>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className={inputClass + ' resize-none'}
          placeholder="Optional"
        />
      </div>
      {/* Honeypot — hidden from people, filled by bots. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
      />
      {submitError && (
        <p className="text-xs text-center font-light text-red-300" role="alert">
          {submitError}
        </p>
      )}
      <button type="submit" disabled={submitting} className="btn-filled w-full disabled:opacity-50">
        {submitting ? 'Reserving…' : 'Reserve This Time'}
      </button>
    </form>
  )
}
