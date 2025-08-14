export function asset(path) {
  // Safely encode spaces and special characters in filenames
  return encodeURI(path)
}
