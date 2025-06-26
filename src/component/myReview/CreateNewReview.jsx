import React, { useEffect, useState, useRef } from 'react'
import { FileUp } from 'lucide-react';
import { useAuth } from '../../provider/authProvider';
import axios from 'axios';

const CreateNewReview = ({ buildingId }) => {
  const { token } = useAuth();

  // displaying and storing the actual data
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    start_year : 2025,
    rating_value : 5,
    content : ""
  });

  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (file && typeof file !== "string") {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl("");
    }
  }, [file]);
  
  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    if (!file) return;

    // Clear both image states
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    // new review
    setIsSubmitting(true);
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
    if (file) {
      formData.append('file', file);
    }
    try{
      const response = await axios.post(`/api/v1/rating/new`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.log(error);
      alert("Failed to share review.");
    } finally{
      setIsSubmitting(false);
    }
  }

  return (
    <div className=' mb-20'>
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
              onChange={(e) => setData(prev => ({ ...prev, rating_value: e.target.value }))}
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
              className="cursor-pointer text-white py-5 flex-1 rounded-2xl text-center mx-5 sm:mb-0 mb-5 bg-[#0F2439] shadow-md shadow-black/40 hover:bg-[#1d4165]"
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
              className="py-5 flex-1 rounded-2xl mx-5 bg-red-400 mr-10 hover:bg-red-200 text-white cursor-pointer"
              style={{
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
          onChange={(e) => setData(prev => ({ ...prev, content: e.target.value }))}
        />

        <div className='flex justify-end'>
          <button 
            className='w-24 h-10 justify-left rounded-xl font-bold text-white cursor-pointer bg-[#0F2439] shadow-md shadow-black/40 hover:bg-[#1d4165]'
            disabled={!data.content || isSubmitting}
            type='submit'
          >share</button>
        </div>
      </form>
    </div>
  )
}

export default CreateNewReview