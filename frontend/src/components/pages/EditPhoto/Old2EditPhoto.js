import React, { useState } from 'react';
import FileInput from '../../common/FileInput/FileInput';
// import Axios from 'axios';

const EditPhoto = () => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [fileData, setFileData] = useState();

  const [images, setFile] = useState('');

  const handleFileChange = ({ target }) => {
    setFileData(target.files[0]);
    console.log(target.files[0]);
    setFile(target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append('image', fileData);
    console.log(fileData);
    await fetch(`${REACT_APP_SERVER_URL}/api/profile/photo`, {
      method: 'put',
      headers: {
        //   'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res.status >= 200 && res.status < 300) {
          // setTimeout(() => {
          //   setAlert({
          //     alertType: 'success',
          //     message: messageTypes.modifySuccess,
          //   });
          // }, 3000);
          console.log('sikeres fotófeltöltés');
        } else {
          // setAlert({
          //   alertType: 'danger',
          //   message: messageTypes.modifyFail,
          // });
          console.log('sikertelen fotófeltöltés');
        }
      });

    // await Axios.post('http://localhost:5000/api/image', formdata)
    //   .then(res => console.log('res', res.data))
    //   .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        type='file'
        value={images}
        name='file'
        accept='image/*'
        onChange={handleFileChange}
        placeholder='upload image'
        isRequired={true}
      />
      <button>submit</button>
    </form>
  );
};

export default EditPhoto;
