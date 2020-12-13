import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchImages, getAllImages, addImage } from '../../store/actions';
import { rootState } from '../../store/reducers';
import Image from '../../components/Image/Image';
import axios from '../../services/axios';
import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const images = useSelector((state: rootState) => state.images.images);
  const [search, setSearch] = useState('');
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    if (!search) dispatch(getAllImages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const setSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchImagesHandler = () => {
    console.log('search', search);
    dispatch(searchImages(search));
  };

  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesData = e.target.files;
    const filteredImages = Array.from(filesData).filter(
      (file) => file.type || file.type.startsWith('image')
    );
    setFiles(filteredImages);
  };

  const uploadHandler = async () => {
    try {
      if (files.length === 0) return;
      console.log('files', files[0]);
      const data = new FormData();
      data.append('image', files[0]);
      const dd = await axios.post('/image/upload', data, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      // console.log('dd.data', dd.data);
      const url = dd.data.url;
      dispatch(addImage(url, []));
      setFiles([]);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className='main mt-4'>
      <div className='upload d-flex justify-content-center'>
        <input type='file' className=' mx-2' onChange={uploadFileHandler} />
        <button className='btn btn-primary' onClick={uploadHandler}>
          upload
        </button>
      </div>
      <div className='mt-5 d-flex justify-content-center align-items-center'>
        <input
          type='text'
          className='mx-2'
          value={search}
          onChange={setSearchHandler}
        />
        <button className='btn btn-primary' onClick={searchImagesHandler}>
          search
        </button>
      </div>
      <div className='d-flex flex-wrap mt-3'>
        {images.map((img) => (
          <Image key={img._id} image={img} />
        ))}
      </div>
    </div>
  );
};

export default Home;
