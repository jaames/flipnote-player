export function generateUid() {
  return (Math.random() + 1).toString(36).substring(5);
}