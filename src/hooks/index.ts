import { useRecoilState } from "recoil";
import { burguerStateAtom } from "./atoms";

export function changeBurguer() {
  const [burguerState, setBurguerState] = useRecoilState(burguerStateAtom);
  return { burguerState, setBurguerState };
}
