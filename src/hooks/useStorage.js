import {useState, useEffect} from 'react';
import {projectStorage, projectFirestore, timestamp } from "../firebase/config";


const useStorage = (images) => {
    const [progress, setProgress] = useState(0);
    const [error,setError] = useState(null);
    const [url, setUrl] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        //refrences
        images.map(file => {
            const storageRef = projectStorage.ref().child(`${file.name}`);
            const collectionRef = projectFirestore.collection('images');
            const imgName= file.name;
            storageRef.put(file).on('state_changed', (snap) =>{
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
                setName(file.name);
            }, (err) => {
            setError(err);
            }, async () => {
                const url = await storageRef.getDownloadURL();
                const createdAt = timestamp();
                collectionRef.add({imgName, url, createdAt});  
                setUrl(url);
            })
        })
        
    }, [images]);

    return {progress, url, error, name}
}

export default useStorage;