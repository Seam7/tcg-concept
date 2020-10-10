import React from "react";

const ImageUploader: React.FC = () => {
  const [value, setValue] = React.useState<File[]>([]);
  const onChange = (files: File[]) => setValue(files);
  const handleUpload = () => {
    const data = new FormData();
    data.append("file", value[0]);
    // data.append("name", value[0].name);
    fetch(
      "https://cqs75fut5i.execute-api.us-west-2.amazonaws.com/dev/card/save",
      {
        body: data,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        method: "POST",
      }
    );
  };
  return (
    <div>
      {Boolean(value.length) && (
        <div>Selected files: {value.map((f) => f.name).join(", ")}</div>
      )}
      <label>
        Click to select some files...
        <input
          style={{ display: "none" }}
          type="file"
          onChange={(e) => {
            if (e.target?.files?.length > 0) {
              onChange([...value, ...e.target.files]);
            }
          }}
        />
      </label>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;
