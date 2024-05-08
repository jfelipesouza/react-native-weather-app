import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export const transformDate = (date: number) => {
  return dayjs(date * 1000)
    .locale('pt-br')
    .format('ddd ha');
};
