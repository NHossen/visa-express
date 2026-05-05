/**
 * Creates a URL-friendly slug from a string.
 * Handles special characters, spaces, and duplicate hyphens.
 */
export function createSlug(str = '') {
  // Ensure we are working with a valid string
  if (!str || typeof str !== 'string') {
    return "";
  }

  return str
    .toLowerCase()                 // Convert to lowercase
    .trim()                        // Remove whitespace from both ends
    .replace(/&/g, 'and')          // Replace & with 'and' (great for business names)
    .replace(/[^a-z0-9\s-]/g, '')  // Remove all non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-')          // Replace one or more spaces with a single hyphen
    .replace(/-+/g, '-')           // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, '');      // Remove leading or trailing hyphens
}