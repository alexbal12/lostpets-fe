import React from "react";
import { CaptionText } from "ui/texts";
import css from "./index.css";

export function InputText({ label, placeholder, name, value, disabled }) {
  return (
    <div>
      <CaptionText text={label} />
      <input
        defaultValue={value}
        name={name}
        className={css.root}
        type="text"
        placeholder={placeholder}
        disabled={disabled}
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
