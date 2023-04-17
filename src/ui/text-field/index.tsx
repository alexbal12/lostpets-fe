import React from "react";
import { CaptionText } from "ui/texts";
import css from "./index.css";
type inputTextType = {
  label: string;
  placeholder?: string;
  name: string;
  value;
  readyonly?;
};
export function InputText(props: inputTextType) {
  return (
    <div>
      <CaptionText text={props.label} />
      <input
        defaultValue={props.value}
        name={props.name}
        className={props.readyonly ? css.root + " " + css.disabled : css.root}
        type="text"
        placeholder={props.placeholder}
        readOnly={props.readyonly}
      ></input>
    </div>
  );
}
export function InputPasswordText({ label, name }) {
  return (
    <div>
      <CaptionText text={label} />
      <input
        name={name}
        className={css.root}
        type="password"
        placeholder="Ingrese su contraseña"
      ></input>
    </div>
  );
}
export function InputPhoneNumberText({ label, name }) {
  return (
    <div>
      <CaptionText text={label} />
      <input
        name={name}
        className={css.root}
        type="number"
        placeholder="Ingrese su número de teléfono"
      ></input>
    </div>
  );
}
export function InputLargeText({ label, name }) {
  return (
    <div>
      <CaptionText text={label} />
      <textarea name={name} className={css.textarea}></textarea>
    </div>
  );
}
