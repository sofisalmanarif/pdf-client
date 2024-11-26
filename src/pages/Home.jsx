import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Popup from '../components/Popup';


export const Url = "https://pdfserver-x314vhv1.b4a.run"
// export const Url = "http://localhost:3000"
const Home = () => {
    const [folders, setFolders] = useState([]);
    const [pdfFile, setPdfFile] = useState(null)
    const [jsonFile, setJsonFile] = useState(null)
    const [loading,setLoading] =  useState(false)
    
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
    <main className="h-screen w-full pt-10">

      <div className='container max-w-7xl mx-auto flex  justify-between  items-center py-20 '>
      <div className="flex flex-col items-center gap-4 p-6 border border-gray-300 rounded-lg shadow-md bg-blue-100">
  <label
    htmlFor="upload-pdf"
    className="flex flex-col items-center justify-center w-64 h-28 border-2 border-dashed border-gray-400 rounded-lg bg-blue-100 hover:bg-blue-200 cursor-pointer"
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
      required="true"
      accept="application/pdf"
      onChange={(e) => setPdfFile(e.target.files[0])}
      className="hidden"
    />
  </label>
  {pdfFile && (
    <p className="text-sm text-green-600">
      {pdfFile.name}
    </p>
  )}
</div>
<div className="flex flex-col items-center gap-4 p-6 border border-gray-300 rounded-lg shadow-md bg-yellow-100">
  <label
    htmlFor="upload-pdf"
    className="flex flex-col items-center justify-center w-64 h-28 border-2 border-dashed border-gray-400 rounded-lg bg-yellow-100 hover:bg-yellow-200 cursor-pointer"
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
    <input
      id="upload-json"
      required="true"
      type="file"  onChange={e=>setJsonFile(e.target.files[0])}
      className="hidden"
    />
  </label>
  {pdfFile && (
    <p className="text-sm text-zinc-900">
      {jsonFile.name} 
    </p>
  )}
</div>

        {/* <div>
          <label htmlFor="Upload json"></label>
        <input type="file"  onChange={e=>setJsonFile(e.target.files[0])} className="file:border-2 file:border-gray-300 file:rounded file:p-2 file:bg-gray-50 file:text-gray-700 file:font-medium hover:file:bg-gray-200 focus:file:border-blue-500 focus:file:ring-2 focus:file:ring-blue-500" />

        </div> */}
    <button onClick={uploadHandler}  className='px-5 py-2 h-12 w-64 bg-red-500 rounded-md font-semibold text-white '>
      {
        loading ? 'Uploading...' : 'Upload'
      }
    </button>
        
      </div>
      <div className="container max-w-7xl flex mx-auto mt-10 flex-col ">
        <h1 className='text-5xl font-semibold'>Documents</h1>
        
       <div className='grid grid-cols-5 '>
       {
        folders.map((folder, index) =>  <Link key={folder} to={`/view-pdf/${folder}`} className="flex flex-col items-center">
        <img
          className="w-36 h-36"
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