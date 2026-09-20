Homepage hero photos
====================

Any photo you list for this folder shows up in the rotating background
on the homepage. You control it — could be 1 photo, could be 50.

How to use it:

1. Drop JPG, PNG, WebP or AVIF files directly into this folder.
   Use reasonably web-sized files (under ~5MB each works best), not
   original/high-resolution photography from the source library.
2. List those filenames in src/lib/catalogue/hero-manifest.json, in
   the order they should play. Prefix filenames (01-, 02-, ...) if
   that helps you organise them; the JSON array order is what the
   site uses.
3. To take a photo out of the rotation, remove it from the manifest
   (and delete or move the file if you no longer need it).
4. If the list is empty or missing, the homepage automatically falls
   back to showing photos from the dress catalogue instead — so it's
   never blank.
5. Photos should be roughly widescreen (this fills the full browser
   width).

The site does not scan this folder at build or request time, so a
file sitting here is not in the carousel until it is listed.

This README itself does nothing — delete it if you like, or leave it
here, it won't show up on the site.
