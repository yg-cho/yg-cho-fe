import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: "loginState",
  default: {loggedIn: false, name: ""},
  effects_UNSTABLE: [persistAtom]
});
