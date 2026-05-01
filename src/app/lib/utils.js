export function createSlug(name) {
  // Check if name exists and is a string
  if (!name || typeof name !== 'string') {
    return ""; 
  }

  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}