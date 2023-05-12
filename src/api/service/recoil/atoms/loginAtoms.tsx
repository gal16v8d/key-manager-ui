import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginUsername',
  default: '',
});
