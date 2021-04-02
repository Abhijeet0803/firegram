import React, {useState} from "react";
import Dropzone from './Dropzone';
import ProgressBar from "./ProgressBar"


const UploadForm = () => {
    const [file,setFile] = useState([]);

    return(
        <>
        <Dropzone file={file} setFile={setFile} />
        {file && <ProgressBar file={file} setFile={setFile}/>}
        </>
    )
}

export default UploadForm;