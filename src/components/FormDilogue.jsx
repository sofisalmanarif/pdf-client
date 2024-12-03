import axios from 'axios'
import React, { useState } from 'react'
import { Url } from '../pages/Home'

const FormDilogue = ({setPopup}) => {
     const [pdfFile, setPdfFile] = useState(null)
     const [strategy, setStrategy] = useState("")
     const [chunkingStrategy, setChunkingStrategy] = useState("")
     const [loading, setLoading] = useState(false)

     async function submitPdfHAndler (){
        if(pdfFile === null){
            alert("set pdf")
        }
        console.log(strategy,chunkingStrategy,
            pdfFile
        )
        try {
            const formData = new FormData();
        formData.append("files", pdfFile);
        formData.append("strategy",strategy)
        formData.append("chunking_strategy",chunkingStrategy)
        formData.append("coordinates",true)
        console.log(formData)
        setLoading(true)
        const {data} = await axios.post(`${Url}/parse-pdf`, formData, {
          
        });
        setLoading(false)
        console.log(JSON.stringify(data))

       
        if(data){
          alert("File Uploaded successfully")
        }

        } catch (error) {
            
          console.log(error)
        }

     }
  return (
    <div className='flex relative h-[450px] w-96 px-8 gap-8 bg-white justify-center rounded-lg shadow-md flex-col items-center'>
        <span  onClick={()=>setPopup((prev)=>!prev)} className='hover:rotate-45 ease-in-out duration-300 h-8 cursor-pointer w-8 mx-2 absolute top-0 right-4 flex  font-bold items-center justify-center rounded-full'>
        <img src="/cross-icon.png" alt="" />
        </span>
        <h1 className='text-4xl'>Upload pdf</h1>
        <div className='flex flex-col w-full'>
    <label className='blocked' htmlFor="">Strategy</label>
    <input value={strategy} onChange={(e)=>setStrategy(e.target.value)} className='w-full border border-gray-300 px-2 py-1 rounded-md ' placeholder="eg:hi_res" type="text" />
</div>
<div className='flex flex-col w-full'>
    <label className='blocked' htmlFor=""> Chunking Strategy</label>
    <input value={chunkingStrategy} onChange={(e)=>setChunkingStrategy(e.target.value)} className='w-full border border-gray-300 px-2 py-1 rounded-md ' placeholder="eg:by_title" type="text" />
</div>
        <div className="flex w-full flex-col items-center gap-4 px-0 py-1 border border-gray-300 rounded-lg shadow-md bg-white">
  <label
    htmlFor="pdf"
    className="flex flex-col py-1 items-center justify-center w-[70%] h-10 border-2 border-dashed border-gray-400 rounded-lg bg-white hover:bg-gray-200 cursor-pointer"
  >
    <div className="flex flex-col items-center gap-1 justify-center">
      <svg
        className="w-4 h-4 text-gray-500"
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
      <p className=" text-sm text-gray-600">Click to upload JSON </p>
    </div>
    <input type="file" id='pdf'  onChange={e=>setPdfFile(e.target.files[0])} className="hidden" />
  </label>
  {pdfFile && (
    <p className="text-sm text-zinc-900">
      {pdfFile.name} 
    </p>
  )}
</div>

<button onClick={submitPdfHAndler} className='px-8 py-2 bg-black hover:bg-zinc-700 rounded-md text-white font-semibold'>{loading ? "Uploading":"Upload"}</button>
    </div>
  )
}

export default FormDilogue