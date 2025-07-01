import React, { useEffect, useState, useRef } from 'react'
import { FileUp } from 'lucide-react';
import { useAuth } from '../../provider/authProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormSubmissionMessage from '../form/FormSubmissionMessage';

const UpdateExistingReview = ({building, initialData, initialFile, initialFileUrl}) => {
  // building : {id, buildingName}
  const navigate = useNavigate();
  const { token } = useAuth();

  // displaying and storing the actual data
  const [file, setFile] = useState(initialFile);
  const [data, setData] = useState(initialData);
  // for comparing 
  // track changed or not
  const [dataChanged, setDataChanged] = useState(false);
  const [fileChanged, setfileChanged] = useState(false);  
  const [outcome, setOutcome] = useState({success: false, message: ""});

  const fileInputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(initialFileUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (file && typeof file !== "string") {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file, initialFileUrl]);
  
  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setfileChanged(true);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    // do nothing if no file is there
    if (!file && !initialFileUrl) return;
    // Clear both file states
    setFile(null);
    setfileChanged(true);
    setPreviewUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleDeleteReview = async (e) => {
    e.preventDefault();
    const response = await axios.delete(`/api/v1/rating/${initialData.rating_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    navigate(`/rating/${building.id}`)
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setIsSubmitting(true);
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
        setOutcome({success: true, message: "successfully updated"})
      } catch( error ) {
        let errorMessage = "Something went wrong";
        
        if (typeof error?.response?.data == "string" && error?.response?.data.toLowerCase().includes("too long")) {
          errorMessage = "Content too long. Please do not exceed 90 words"
        }

        setOutcome({ success: false, message: errorMessage });
      }
    }
    // update file
    if (fileChanged && file !== null){
      const formDatafile = new FormData();
      formDatafile.append("file", file)
      try{
        const response = await axios.post(`/api/v1/image/${data.rating_id}`, formDatafile, { 
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        setOutcome({success: true, message: "successfully updated"})
      } catch (error) {
        let errorMessage = "Something went wrong";
        
        if (typeof error?.response?.data == "string" && error?.response?.data.toLowerCase().includes("maximum")) {
          errorMessage = "Upload file could not exceed 2MB"
        } 

        setOutcome({ success: false, message: errorMessage });
      }
    }

    // delete file
    if (fileChanged && initialFileUrl !== null && file === null){
      try{
        const response = await axios.delete(`/api/v1/image/${data.rating_id}`, { 
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        setOutcome({success: true, message: "successfully updated"})
      } catch (error) {
        let errorMessage = "Something went wrong";
        
        if (typeof error?.response?.data == "string") {
          errorMessage = error?.response?.data;
        }

        setOutcome({ success: false, message: errorMessage });
      }
    }
    setIsSubmitting(false);
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
            {previewUrl && previewUrl !== "" ? 
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
              className="py-5 flex-1 rounded-2xl mx-5 cursor-pointer bg-[#fc8181] hover:bg-[#e3afaf] shadow-md shadow-black/40"
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
            onClick={handleDeleteReview}
            disabled={isSubmitting}
            className='w-24 h-10 justify-left rounded-xl font-bold bg-red-400 mr-10 hover:bg-red-200 text-white cursor-pointer'
            style={{
              boxShadow: '2px 4px 4px -1px rgba(0, 0, 0, 0.4)'
            }}
          >
            delete
          </button>
          <button 
            className='w-24 h-10 justify-left rounded-xl font-bold bg-[#0F2439] hover:bg-[#1d4165] shadow-md shadow-black/40 text-white cursor-pointer'
            type='submit'
            disabled={!data.content || isSubmitting}
          >share</button>
        </div>
        {console.log("Outcome to render:", outcome)}
        <FormSubmissionMessage outcome={outcome}/>
      </form>
    </div>
  )
}

export default UpdateExistingReview