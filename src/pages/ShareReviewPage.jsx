import React, { useEffect, useState, useRef } from 'react'
import ReviewHeader from '../component/review/ReviewHeader'
import { FileUp } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import axios from 'axios';
import { BASE_URL } from '../config/config';

const ShareReviewPage = () => {
  const { token } = useAuth();
  const { buildingId } = useParams();



  // fetch data and file from server
  useEffect(() => {
    const fetchReviewAndImage = async () => {
      try {
        const response = await axios.get(`/api/v1/rating/my-ratings/${buildingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (response.status === 200) {
          const data = response.data;
          setData(data);
          setInitialData(data);

          const fileResponse = await axios.get(`/api/v1/image/${data.rating_id}`, {
            responseType: 'arraybuffer' 
          });
          if (fileResponse.status === 200) {
            const blob = new Blob([fileResponse.data], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);
            setInitialImageUrl(imageUrl);
            setFile(imageUrl);
          }
        } else if (response.status === 204) {
          // no review exists
          setInitialData(null);
          setData({
            start_year: "",
            rating_value: 5,
            content: "",
          });
        }
      } catch (err) {
        console.error("Error fetching review or image: ", err);
      }
    };

    fetchReviewAndImage();
  }, []);


  // displaying and storing the actual data
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    start_year : "",
    rating_value : 5,
    content : ""
  });
  // for comparing 
  const [initialData, setInitialData] = useState(null);
  const [initialImageUrl, setInitialImageUrl] = useState("");
  // track changed or not
  const [dataChanged, setDataChanged] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);  

  const fileInputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (file && typeof file !== "string") {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(initialImageUrl);
    }
  }, [file, initialImageUrl]);
  
  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImageChanged(initialImageUrl !== file)
  }

  const handleDelete = (e) => {
    e.preventDefault();
    if (!file && !initialImageUrl) return;

    // Clear both image states
    setFile(null);
    setInitialImageUrl("");
    setImageChanged(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    // new review
    if (initialData == null){
      const formData = new FormData();
      formData.append('rating_data', new Blob(
        [JSON.stringify({
          buildingId: buildingId,
          content: data.content,
          startYear: data.start_year,
          ratingValue: data.rating_value
        })],
        { type: "application/json" }
      ));
      formData.append('file', file);
      try{
        const response = await axios.post(`/api/v1/rating/new`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    // update data
    if (dataChanged){
      try{
        const response = await axios.put(`/api/v1/rating/${data.rating_id}`, {
          content: data.content,
          start_year: data.start_year,
          rating_value: data.rating_value
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch( error ) {
        console.log(error);
      }
    }
    // update / upload new image
    if (imageChanged && file !== null){
      const formDataImage = new FormData();
      formDataImage.append("file", file)
      try{
        const response = await axios.post(`/api/v1/image/${data.rating_id}`, formDataImage, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
      } catch (error) {
        console.log(error);
      }
    }

    // delete image
    if (imageChanged && initialImageUrl !== null && file === null){
      try{
        const response = await axios.delete(`/api/v1/image/${data.rating_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
      } catch (error) {
        console.log(error);
      }
    }

  }

  return (
    <div className=' mb-20'>
      <ReviewHeader buildingName={data.building_name} buildingId={data.building_id}/>
      <form 
        className='px-10 md:px-20 lg:px-30 mt-20 flex flex-col'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col sm:flex-row'>
          <div className='mb-10 justify-start w-1/2'>
            <label 
              htmlFor='schoolTerm' 
              className='mb-5'
            >
              Term: 
            </label>
            <select  
              id="schoolTerm"
              className='border-1 rounded-md px-4 py-1 block outline-none'
              value={data.start_year}
              onChange={(e) => {
                setData(prev => ({ ...prev, start_year: e.target.value }))
                if (!initialData || e.target.value !== initialData.start_year)
                  setDataChanged(true)
              }}
            >
              <option value={2025}>2025</option>
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
              <option value={2022}>2022</option>
              <option value={2021}>2021</option>
              <option value={2020}>2020</option>
            </select>
          </div>
          <div className='mb-10 w-1/2'>
            <label 
              htmlFor='rating' 
              className='mb-5'
            >
              Rating: 
            </label>
            <select
              id="rating"
              className='border-1 rounded-md w-30 px-5 py-1 block outline-none'
              value={data.rating_value}
              onChange={(e) => {
                setData(prev => ({ ...prev, rating_value: e.target.value }))
                const newValue = Number(e.target.value);
                if (!initialData || newValue !== initialData.rating_value)
                  setDataChanged(true)
              }}
            >
              <option value={5}>5</option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
            </select>
          </div>
        </div>
        <div
          className='mb-5 border-1 rounded-2xl flex flex-col justify-between'
        >
          <div className='flex justify-center'>
            {previewUrl ? 
              <img 
                src={previewUrl} 
                alt="uploaded file preview" 
                className='rounded-2xl h-50 object-contain m-5'
                style={{
                  backgroundColor: '#0F2439',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)'
                }}
              /> 
              :  
              <FileUp size={100} className='m-5'/>
            }
          </div>
          <div className='flex justify-around my-5 sm:flex-row flex-col'>
            <label
              htmlFor="fileUpload"
              className="cursor-pointer text-white py-5 flex-1 rounded-2xl text-center mx-5 sm:mb-0 mb-5"
              style={{
                backgroundColor: '#0F2439',
                boxShadow: '2px 4px 4px -1px rgba(0, 0, 0, 0.4)'
              }}
            >
              Upload File
            </label>
            <input 
              type="file" 
              id="fileUpload"
              onChange={handleUpload}
              accept=".jpg, .jpeg"
              ref={fileInputRef}
              className='hidden'
            />
            <button
              className="py-5 flex-1 rounded-2xl mx-5 cursor-pointer"
              style={{
                backgroundColor: '#fc8181',
                boxShadow: '2px 4px 4px -1px rgba(0, 0, 0, 0.4)'
              }}
              onClick={handleDelete}
            >
              delete
            </button>
          </div>
        </div>
      
        <textarea 
          className="w-full h-80 border rounded-2xl focus:outline-none px-5 py-5 leading-none resize-none mb-5"
          type="text"
          placeholder="Type something..."
          value={data.content}
          onChange={(e) => {
            setData(prev => ({ ...prev, content: e.target.value }))
            if (!initialData || initialData.content !== e.target.value)
              setDataChanged(true)
          }}
        />

        <div className='flex justify-end'>
          <button 
            className='w-24 h-10 justify-left rounded-xl font-bold text-white cursor-pointer'
            style={{
              backgroundColor: '#0F2439',
              boxShadow: '2px 4px 4px -1px rgba(0, 0, 0, 0.4)'
            }}
            type='submit'
          >share</button>
        </div>
      </form>
    </div>
  )
}

export default ShareReviewPage