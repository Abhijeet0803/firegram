import {useState, useEffect} from 'react';

import Resizer from 'react-image-file-resizer';
import {projectStorage, projectFirestore, timestamp } from "../firebase/config";

const resizeFile = (file, width, height) => new Promise(resolve => {
    Resizer.imageFileResizer(file, width, height, 'JPEG', 100, 0,
    uri => {
      resolve(uri);
    },
    'file'
    );
});

const useStorage = (images) => {
    const [progress, setProgress] = useState(0);
    const [error,setError] = useState(null);
    const [url, setUrl] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        
        images.forEach(file => {
            let storageRef = projectStorage.ref().child(`${file.name}`);
            const collectionRef = projectFirestore.collection('images');
            const collectionRef240 = projectFirestore.collection('images240p')
            const collectionRef720 = projectFirestore.collection('images720p')
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
                storageRef = projectStorage.ref().child(`${file.name}_240`);
                const image240 = await resizeFile(file, 426, 240);
                storageRef.put(image240).on('state_changed', () =>{}, () => {}, 
                async () => {
                    const url = await storageRef.getDownloadURL();
                    const createdAt = timestamp();
                    collectionRef240.add({imgName: image240.name, url, createdAt});  
                    storageRef = projectStorage.ref().child(`${file.name}_720`);
                    const image720 = await resizeFile(file, 1280, 720);
                    storageRef.put(image720).on('state_changed', () =>{}, () => {}, 
                    async () => {
                        const url = await storageRef.getDownloadURL();
                        const createdAt = timestamp();
                        collectionRef720.add({imgName: image720.name, url, createdAt});  
                    })
                })
            })
        })
        
    }, [images]);

    return {progress, url, error, name}
}

export default useStorage;