import { atom } from "recoil";

export const burguerStateAtom = atom({
  key: "burguerState",
  default: false,
});
export const reportCardStateAtom = atom({
  key: "reportCardState",
  default: false,
});
export const petsStateAtom = atom({
  key: "petsState",
  default: [],
});
export const currentPetStateAtom = atom({
  key: "currentPetState",
  default: "",
});
export const emailDataAtom = atom({
  key: "emailState",
  default: [],
});
export const MyPetsStateAtom = atom({
  key: "MyPetsState",
  default: [],
});
export const userDataAtom = atom({
  key: "userState",
  default: [],
});
export const petPositionAtom = atom({
  key: "petPosition",
  default: [],
});
