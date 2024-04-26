export function maskPhone(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input || !('value' in input)) return;
  let { value } = input;
  value = value.replaceAll(/\D/g, '');
  value = value.replaceAll('', '');
  let res = value.substring(0, 1);
  if (value.length > 1) res += ` (${value.substring(1, 4)}`;
  if (value.length > 4) res += `) ${value.substring(4, 7)}`;
  if (value.length > 7) res += ` ${value.substring(7, 9)}`;
  if (value.length > 9) res += ` ${value.substring(9, 11)}`;
  input.value = res;
}
