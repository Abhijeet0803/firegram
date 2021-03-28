import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const Dropzone = ({file, setFile}) => {
  const onDrop = useCallback(files => {
    // Do something with the files
    setFile(files);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="drag">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p className="drag-text">Drop the files here ...</p> :
          <p className="drag-text">Drag 'n' drop some files here, or click to select files or click on<strong>(+)</strong></p>
      }
    </div>
  )
}

export default Dropzone;