import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


const Home = () => {
    const [folders, setFolders] = useState([]);
    async function getPdfs() {
      const { data } = await axios.get("https://pdfserver-x314vhv1.b4a.run/get-pdf-files");
      setFolders(data.folderFiles);
      console.log(folders);
    }
    useEffect(() => {
      getPdfs();
    }, []);

  return (
    <>
    <div className="h-screen w-full pt-10">
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