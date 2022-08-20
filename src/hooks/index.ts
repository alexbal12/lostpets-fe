import { useRecoilState } from "recoil";
import {
  burguerStateAtom,
  currentPetStateAtom,
  emailDataAtom,
  MyPetsStateAtom,
  petPositionAtom,
  petsStateAtom,
  reportCardStateAtom,
  userDataAtom,
} from "./atoms";

export function changeBurguer() {
  const [burguerState, setBurguerState] = useRecoilState(burguerStateAtom);
  return { burguerState, setBurguerState };
}
export function changeReportCard() {
  const [reportCardState, setReportCardState] =
    useRecoilState(reportCardStateAtom);
  return { reportCardState, setReportCardState };
}
export function allPets() {
  const [petsState, setPetsState] = useRecoilState(petsStateAtom);
  return { petsState, setPetsState };
}
export function currentPet() {
  const [currentPetState, setCurrentPetState] =
    useRecoilState(currentPetStateAtom);
  return { currentPetState, setCurrentPetState };
}
export function checkEmail() {
  const [emailDataState, setEmailDataState] = useRecoilState(emailDataAtom);
  return { emailDataState, setEmailDataState };
}
export function myPets() {
  const [myPetsState, setMyPetsState] = useRecoilState(MyPetsStateAtom);
  return { myPetsState, setMyPetsState };
}
export function userData() {
  const [userDataState, setUserDataState] = useRecoilState(userDataAtom);
  return { userDataState, setUserDataState };
}
export function positionPet() {
  const [lngLat, setLngLat] = useRecoilState(petPositionAtom);
  return { lngLat, setLngLat };
}
