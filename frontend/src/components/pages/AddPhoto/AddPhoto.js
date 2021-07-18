import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

const AddPhoto = () => {
  const { REACT_APP_SERVER_URL } = process.env;
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    email: '',
    image: '',
  });

  useEffect(() => {
    fetch(`http://localhost:5000/photo/${id}`)
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  const handleChange = email => e => {
    const value = email === 'image' ? e.target.files[0] : e.target.value;
    setData({ ...data, [email]: value });
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append('image', data.image);
      formData.append('email', data.email);

      const res = await fetch(
        `${REACT_APP_SERVER_URL}/profile/edit/photo/${id}`,
        {
          method: 'POST',
          body: formData,
        }
      );
      if (res.ok) {
        setData({ email: '', image: '' });
        history.replace('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <div className='mb-3'>
        <input
          className='form-control'
          placeholder='Enter email'
          type='text'
          name='email'
          value={data.email}
          onChange={handleChange('email')}
        />
      </div>
      <div className='mb-3'>
        <input
          className='form-control'
          type='file'
          accept='image/*'
          name='image'
          onChange={handleChange('image')}
        />
      </div>
      <div className='text-center'>
        <button className='btn btn-primary' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddPhoto;
