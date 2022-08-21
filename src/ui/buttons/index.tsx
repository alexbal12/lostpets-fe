import { loadingButton } from "hooks";
import React, { useEffect, useState } from "react";
import css from "./index.css";

type BtnType = {
  text: string;
  handleClick?: () => void;
  type?: "submit" | "button";
  color: "green" | "gray" | "pink";
};
export function Button(props: BtnType) {
  const { loadButton, setLoadButton } = loadingButton();
  const { text, handleClick, type, color } = props;
  const [colorButton, setColorButton] = useState({});
  useEffect(() => {
    if (loadButton === true) {
      setLoadButton(false);
    }
  }, []),
    useEffect(() => {
      if (color == "gray") setColorButton({ background: "#CDCDCD" });
      if (color == "pink") setColorButton({ background: "#FF9DF5" });
      if (color == "green") setColorButton({ background: "#97EA9F" });
    }, []);
  function handleClickBtn() {
    setLoadButton(!loadButton);
    handleClick && handleClick();
  }
  return (
    <button
      style={colorButton}
      type={type}
      className={`${loadButton ? css.button + " " + css.loading : css.button}`}
      onClick={handleClickBtn}
    >
      <span className={css.text}>{text}</span>
    </button>
  );
}
