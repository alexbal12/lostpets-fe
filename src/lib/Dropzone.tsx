import { loadingButton } from "hooks";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "ui/buttons";
const img: any = {
  width: "100%",
  maxHeight: "300px",
  objectFit: "contain",
  marginBottom: "15px",
};

export function Dropzone({ idImg, src }) {
  const [files, setFiles] = useState([]);
  const { setLoadButton } = loadingButton();
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setFiles(e.target.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
      setLoadButton(false);
    },
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <img id={idImg} style={img} src={files.length == 0 ? src : files} />
      <Button
        color="green"
        text="agregar/modificar foto"
        type="button"
        handleClick={open}
      />
    </div>
  );
}
