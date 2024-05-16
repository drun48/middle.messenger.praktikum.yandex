import constants from '../constants';

export function formatDate(dateStr:string) {
  const date = new Date(dateStr);
  return {
    dayString: `${date.getDay()}  ${constants.MOUNTH[date.getMonth()].toLowerCase()}`,
    time: `${date.getHours() > 9 ? date.getHours() : 0 + date.getHours().toString()}:${date.getMinutes() > 9 ? date.getMinutes() : 0 + date.getMinutes().toString()}`,
  };
}
