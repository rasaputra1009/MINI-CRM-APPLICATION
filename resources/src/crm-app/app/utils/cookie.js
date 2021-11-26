/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
export default function cookie(payload) {
  const data = payload.split('; ');
  const result = {};
  for (const i in data) {
    const cur = data[i].split('=');
    result[cur[0]] = cur[1];
  }
  return result;
}
