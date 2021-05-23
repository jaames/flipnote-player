import React from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {}

export const Dropzone: React.FunctionComponent<Props> = ({ children }) => {

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    accept: ['.ppm', '.kwz', '.kwc', '.ico', '.lst', '.pls'],
    noClick: true,
    noKeyboard: true
  });
  
  return (
    <div {...getRootProps({className: 'dropzone'})}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here</p>
      <button type="button" onClick={open}>
        Open File Dialog
      </button>
    </div>
  );
}