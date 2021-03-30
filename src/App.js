import React, { useState } from 'react';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';


function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [displayImgArray, setDisplayImgArray] = useState([])
  return (
    <div className="App">
      <Title/>
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} setDisplayImgArray={setDisplayImgArray}/>
      {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} displayImgArray={displayImgArray}/>}
    </div>
  );
}

export default App;
