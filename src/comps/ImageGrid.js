import React, { useEffect, useState, useRef } from "react";
import useFireStore from '../hooks/useFirestore';

const ImageGrid = ({setSelectedImg , setDisplayImgArray}) => {

    const {docs} = useFireStore('images');
    const [end, setEnd] = useState(10);
    const [element, setElement] = useState(null);
    const [displayedImg, setDisplayedImg] = useState(docs);
    
    const observer = useRef(
        new IntersectionObserver((entries) => {
            const last = entries[0];

            if(last.isIntersecting){
                setEnd(prev => prev+10);
            }
        }, {threshold:1})
    );

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if(currentElement){
            currentObserver.observe(currentElement);
        }

        return () => {
            if(currentElement) {
                currentObserver.unobserve(currentElement);
            }
        }
    }, [element])
    

    useEffect(() => {
        let abc = docs.slice(0, end);
         setDisplayedImg(abc);
         
    }, [docs, end])
 
    

    return (
        <div className="img-grid" onLoad={() => setDisplayImgArray(displayedImg)}>
        { displayedImg && displayedImg.map((doc, index) => {
            if(displayedImg.length === index+1){
                return(
                <div className="img-wrap" key={doc.id} onClick={() => setSelectedImg(doc) } ref={setElement}>
                <img src={doc.url} alt="pic" />
            </div>)
            }
            else{
                return(
                <div className="img-wrap" key={doc.id} onClick={() => setSelectedImg(doc) }>
                <img src={doc.url} alt="pic" />
            </div>)
            }  
        })
        }
        
        </div>
    )
}

export default ImageGrid;


































// import React from "react";
// import useFireStore from '../hooks/useFirestore';

// const ImageGrid = ({setSelectedImg}) => {

//     const {docs} = useFireStore('images');
//     console.log(docs);

//     return (
//         <div className="img-grid">
//         { docs && docs.map(doc => (
//             <div className="img-wrap" key={doc.id} onClick={() => setSelectedImg(doc.url) }>
//                 <img src={doc.url} alt="pic" />
//             </div>
//         ))
//         }
//         </div>
//     )
// }

// export default ImageGrid;