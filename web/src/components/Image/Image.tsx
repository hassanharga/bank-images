import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteImg, editImageTags } from '../../store/actions';
import deleteIcon from '../../assets/img/close.svg';
// import dd from '../../../public/uploads/rabbit-542554_1920.jpg';

type Props = {
  image: {
    tags: string[];
    url: string;
    _id: string;
    userId: string;
  };
};
const Image: React.FC<Props> = ({ image: img }) => {
  const dispatch = useDispatch();
  const [tag, setTag] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const changeTagHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };
  const deleteImgHandler = (_id: string) => {
    dispatch(deleteImg(_id));
  };

  const addTagHandler = () => {
    dispatch(editImageTags(img._id, tag));
    setIsEdit(false);
  };

  return (
    <div className='img-container mx-2' key={img.url}>
      <div className='actions'>
        {!isEdit ? (
          <div>
            <p>{img.tags.join(' ')}</p>
            <button
              className='btn btn-link'
              onClick={() => {
                setIsEdit(true);
              }}
            >
              add tag
            </button>
          </div>
        ) : (
          <div>
            <input type='text' value={tag} onChange={changeTagHandler} />
            <button onClick={addTagHandler} className='btn btn-primary'>
              add tag
            </button>
          </div>
        )}
      </div>
      <div className='images'>
        <img
          className='close'
          src={deleteIcon}
          alt=''
          onClick={() => {
            deleteImgHandler(img._id);
          }}
        />
        <img src={img.url} alt='' />
      </div>
    </div>
  );
};

export default Image;
