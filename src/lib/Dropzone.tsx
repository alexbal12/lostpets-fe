import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ButtonGreen } from "ui/buttons";

// const thumbsContainer: any = {
//   display: "flex",
//   flexDirection: "row",
//   flexWrap: "wrap",
// };

// const thumb: any = {
//   display: "inline-flex",
//   borderRadius: 2,
//   border: "1px solid #eaeaea",
//   marginBottom: 8,
//   marginRight: 8,
//   width: 100,
//   height: 100,
//   padding: 4,
//   boxSizing: "border-box",
// };

// const thumbInner = {
//   display: "flex",
//   minWidth: 0,
//   overflow: "hidden",
// };

const img: any = {
  width: "100%",
  maxHeight: "300px",
  objectFit: "contain",
  marginBottom: "15px",
};
export function Dropzone(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  return (
    <div className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <aside>{thumbs}</aside>
        <ButtonGreen
          text="agregar/modificar foto"
          type="button"
          handleClick={open}
        />
      </div>
    </div>
  );
}
