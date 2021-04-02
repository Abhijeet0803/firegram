import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const Dropzone = ({file, setFile}) => {
  const onDrop = useCallback(files => {
    setFile(files);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="drag">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p className="drag-text">Drop the files here ...</p> : 
          <div>
          <p className="drag-text">Drag & drop files here</p>
          <p className="drag-text">OR</p>
          <p className="drag-text">Click to browse files</p>
          </div>
          
      }
    </div>
  )
}

export default Dropzone;