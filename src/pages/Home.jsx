import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Popup from '../components/Popup';
import FormDilogue from '../components/FormDilogue';


export const Url = "https://pdfserver-x314vhv1.b4a.run"
// export const Url = "http://localhost:3000"
const Home = () => {
    const [folders, setFolders] = useState([]);
    const [pdfFile, setPdfFile] = useState(null)
    const [jsonFile, setJsonFile] = useState(null)
    const [loading,setLoading] =  useState(false)
    const [popup, setPopup] = useState(false)
    
    async function getPdfs() {
      const { data } = await axios.get(`${Url}/get-pdf-files`);
      setFolders(data.folderFiles);
      console.log(folders);
    }

    async function uploadHandler() {
      if (!pdfFile || !jsonFile) {
        alert("Please select both PDF and JSON files.");
        return;
      }
    
      try {
        const formDataPdf = new FormData();
        formDataPdf.append("file", pdfFile);
        setLoading(true)
        const pdfRes = await axios.post(`${Url}/upload-pdf`, formDataPdf, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        const formDataJson = new FormData();
        formDataJson.append("file", jsonFile);
    
        const jsonRes = await axios.post(`${Url}/upload-json`, formDataJson, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        console.log("PDF Response:", pdfRes.data);
        console.log("JSON Response:", jsonRes.data);
        setLoading(false)
        alert("Files uploaded successfully!");
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
    
    useEffect(() => {
      getPdfs();
    }, []);

  return (
    <>
    <main className="h-screen w-full ">

      <div className='container max-w-7xl mx-auto flex flex-col  justify-between gap-8 items-center pt-20 '>
      <div className='flex items-center  w-full justify-between gap-4'>
      <div className="flex w-[45%] flex-col items-center gap-4 p-6 border border-gray-300 rounded-lg shadow-md bg-blue-100">
  <label
    htmlFor="upload-pdf"
    className="flex flex-col items-center justify-center w-[70%] h-32 border-2 border-dashed border-gray-400 rounded-lg bg-blue-100 hover:bg-blue-200 cursor-pointer"
  >
    <div className="flex flex-col items-center justify-center">
      <svg
        className="w-8 h-8 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 16.5V6a2 2 0 012-2h14a2 2 0 012 2v10.5M16 9l-4-4m0 0l-4 4m4-4v12"
        />
      </svg>
      <p className="mt-2 text-sm text-gray-600">Click to upload PDF</p>
    </div>
    <input
      id="upload-pdf"
      type="file"
      accept="application/pdf"
      onChange={(e) => setPdfFile(e.target.files[0])}
      className="hidden"
    />
  </label>
  {pdfFile && (
    <p className="text-sm text-green-600">
      {pdfFile?.name}
    </p>
  )}
</div>
<div className="flex w-[45%] flex-col items-center gap-4 p-6 border border-gray-300 rounded-lg shadow-md bg-yellow-100">
  <label
    htmlFor="upload-json"
    className="flex flex-col items-center justify-center w-[70%] h-32 border-2 border-dashed border-gray-400 rounded-lg bg-yellow-100 hover:bg-yellow-200 cursor-pointer"
  >
    <div className="flex flex-col items-center justify-center">
      <svg
        className="w-8 h-8 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 16.5V6a2 2 0 012-2h14a2 2 0 012 2v10.5M16 9l-4-4m0 0l-4 4m4-4v12"
        />
      </svg>
      <p className="mt-2 text-sm text-gray-600">Click to upload JSON </p>
    </div>
    <input type="file" id='upload-json'  onChange={e=>setJsonFile(e.target.files[0])} className="hidden" />
  </label>
  {jsonFile && (
    <p className="text-sm text-zinc-900">
      {jsonFile.name} 
    </p>
  )}
</div>
      </div>

      
    <button onClick={uploadHandler}  className='px-5   h-14 w-[50%] hover:bg-red-600 bg-red-500 text-xl rounded-md font-semibold text-white '>
      {
        loading ? 'Uploading...' : 'Upload'
      }
    </button>
        
      </div>
      <div className="container max-w-7xl relative flex mx-auto mt-16 flex-col ">
        <div className='flex items-center justify-between'>
        <h1 className='text-5xl font-semibold'>Documents</h1>
        <button onClick={()=>setPopup(true)} className='px-8 py-2 bg-black hover:bg-zinc-700 rounded-md text-white font-semibold'>Upload PDF</button>
        </div>
        { popup &&
          <div className='absolute top-0 left-[40%]'>
        <FormDilogue setPopup={setPopup}/>
        </div>
}
       <div className='grid grid-cols-5 '>
       {
        folders.map((folder, index) =>  <Link key={folder} to={`/view-pdf/${folder}`} className="flex hover:bg-zinc-300/50 ease-in-out duration-600 mx-6 py-8 rounded-lg flex-col items-center">
        <img
          className="w-36  h-40 ease-in-out duration-300  "
          src="/pdf-icon-red-and-white-color-for-free-png.webp"
          alt=""
        />
        <h2>{folder}</h2>
      </Link>)
       }
       </div>
      </div>

    </main>
  </>
  )
}

export default Home