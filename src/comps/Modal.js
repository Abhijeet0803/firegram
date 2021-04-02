import React from "react";

const Modal = ({selectedImg, setSelectedImg, displayImgArray}) => {
    

    const handleClick = (e) => {
        if(e.target.classList.contains("backdrop")){
            setSelectedImg(null);
        }
        
    }

    const handlePrevClick = (e) => {
        setSelectedImg(prev => {
            const imgId = prev.id;
            let index = displayImgArray.findIndex(img => img.id === imgId);
           // console.log(index); 
            const newImg = displayImgArray[(index-1)>0 ? index-1:displayImgArray.length-1];
            return(newImg);
        })
    }

    const handleNextClick = (e) => {
        setSelectedImg(prev => {
            const imgId = prev.id;
            let index = displayImgArray.findIndex(img => img.id === imgId);
            //console.log(index);
            const newImg = displayImgArray[(index+1)%displayImgArray.length];
            return(newImg);
        })
    }

    return (
        <div className="backdrop" onClick={handleClick}>
            <p>{selectedImg.imgName}</p>
            <img src={selectedImg.url} alt= "img" />
            <div className="btn">
                <button type="button" onClick={handlePrevClick}>Prev</button>
                <button type="button" onClick={handleNextClick}>Next</button>
            </div>
            
        </div>
    )
}

export default Modal;