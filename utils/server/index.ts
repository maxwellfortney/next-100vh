export function errorMessage(message: string) {
  return JSON.stringify({ error: message }, null, 2);
}
