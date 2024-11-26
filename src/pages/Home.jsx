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
        console.error("Please select both PDF and JSON files.");
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
    <div className="h-screen w-full pt-10">

      <div className='container mx-auto flex '>
        <div>
      <label htmlFor="Upload pdf"></label>
      <input type="file"
       onChange={(e) => setPdfFile(e.target.files[0])}
       accept="application/pdf"
       placeholder="Upload PDF"
       className="file:border-2 file:border-gray-300 file:rounded file:p-2 file:bg-gray-50 file:text-gray-700 file:font-medium hover:file:bg-gray-200 focus:file:border-blue-500 focus:file:ring-2 focus:file:ring-blue-500" />

        </div>
        <div>
          <label htmlFor="Upload json"></label>
        <input type="file"  onChange={e=>setJsonFile(e.target.files[0])} className="file:border-2 file:border-gray-300 file:rounded file:p-2 file:bg-gray-50 file:text-gray-700 file:font-medium hover:file:bg-gray-200 focus:file:border-blue-500 focus:file:ring-2 focus:file:ring-blue-500" />

        </div>
    <button onClick={uploadHandler} className='px-5 py-2 bg-red-500 rounded-md text-white '>
      {
        loading ? 'Uploading...' : 'Upload'
      }
    </button>
        
      </div>
      <div className="container flex mx-auto gap-10">
        
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
  </>
  )
}

export default Home