export function uppercaseFirst(text: string) {
  if (typeof text !== 'string') return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function generateRandomString(length: number): string {
  let text = '';
  // noinspection SpellCheckingInspection
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const possibleLength = possible.length;

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possibleLength));
  }

  return text;
}

export function datetimeUTCString(date = new Date()): string {
  return date.toISOString().replace(/[-:T.Z]/g, '');
}

export function dateString(date = new Date()): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function dateUTCString(date = new Date()): string {
  return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
}

export function timeString(date = new Date()): string {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function timeUTCString(date = new Date()): string {
  return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
}
