import React, { useState } from 'react';

const App = () => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [photo, setPhoto] = useState();
  // console.log('photo.id', photo._id);

  const handleSubmit = e => {
    e.preventDefault();
    const file = document.getElementById('selectedPhoto').files;
    const formData = new FormData();

    formData.append('img', file[0]);
    console.log(formData);
    fetch(`${REACT_APP_SERVER_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    }).then(resData => {
      setPhoto(resData);
      console.log(resData);
    });

    document
      .getElementById('img')
      .setAttribute(
        'src',
        `${REACT_APP_SERVER_URL}/api/upload/${file[0].name}`
      );
    console.log(file[0]);
  };

  return (
    <div className='container m-5'>
      <div className='jumbotron'>
        <h1 className='display-4'>My Profile picture</h1>
        <p className='lead'>Please upload your profile photo below</p>
        <hr className='my-4' />
      </div>
      <form onSubmit={handleSubmit}>
        <div className='input-group mb-3'>
          <div className='custom-file'>
            <input
              type='file'
              className='custom-file-input'
              id='selectedPhoto'
              // aria-describedby='inputGroupFileAddon01'
            />
            <label className='custom-file-label' htmlFor='selectedPhoto'>
              Choose file
            </label>
          </div>
        </div>
        <button type='submit' className='btn btn-primary'>
          Upload
        </button>
      </form>
      <hr />

      {photo ? (
        <p>There is a photo</p>
      ) : (
        <>
          <p>No photo to show</p>
          <img
            // src={photo.url}
            alt=''
            id='img'
            style={{
              display: 'block',
            }}
          ></img>
        </>
      )}
    </div>
  );
};

export default App;
