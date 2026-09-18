import gown from './gown';
import designer from './designer';
import galleryImage from './galleryImage';
import realBride from './realBride';
import blogPost from './blogPost';
import testimonial from './testimonial';
import teamMember from './teamMember';
import { verifiedString, verifiedStringList, verifiedText } from './objects/verifiedField';
import { gownImage } from './objects/gownImage';

export const schemaTypes = [
  verifiedString,
  verifiedText,
  verifiedStringList,
  gownImage,
  gown,
  designer,
  galleryImage,
  realBride,
  blogPost,
  testimonial,
  teamMember,
];
