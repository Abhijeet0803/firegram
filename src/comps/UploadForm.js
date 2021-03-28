import React, {useState} from "react";
import Dropzone from './Dropzone';
import ProgressBar from "./ProgressBar"


const UploadForm = () => {
    const [error, setError] = useState(null);
    const [file,setFile] = useState([]);
    //const type = ['image/png','image/jpeg'];

    const changeHandler = (e) => {
        const images = Object.values(e.target.files);
        console.log (images)
            if(images){
                setFile(images);
                setError('');
            }
            else{
                setFile(null);
                setError('Please select an image file');
            }
        }
        

    
    return(
        <>
        <Dropzone file={file} setFile={setFile} />
        <form>
          <label>
          <input type="file" onChange={changeHandler} multiple/>
          <span>+</span>
          </label> 
            <div className="output">
            {error && <div className="error">{error}</div>}
            {file && <div>{file.name}</div>}
            {file && <ProgressBar file={file} setFile={setFile}/>}
            </div>
        </form>
        </>
    )
}

export default UploadForm;