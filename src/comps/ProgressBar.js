import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage"; 

const ProgressBar = ({file, setFile}) => {
    const {url, progress, name} = useStorage(file);
    
    useEffect(()=> {
        if(url){
            setFile(null);
        }
    }, [url, setFile])

    return (
        <div>
            <div className="progress-bar" style={{width: progress+'%' }} />
            {name && <p>{name}</p>}
        </div>
        
    )
}

export default ProgressBar;