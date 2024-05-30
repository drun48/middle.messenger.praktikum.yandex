const HOST = 'https://ya-praktikum.tech/api/v2';
const WSS = 'wss://ya-praktikum.tech';
// eslint-disable-next-line no-shadow
enum MOUNTH {
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Майя',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декаря',
}
export default {
  HOST,
  WSS,
  GET_PHOTO: `${HOST}/resources`,
  MOUNTH,
} as const;
