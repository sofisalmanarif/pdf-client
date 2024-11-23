import React from 'react'

const Popup = ({metaData={},setIsDialogueOpen}) => {
    console.log("metadata in popup",metaData[0]?.coordinates[0][0])
  return (
    <div className="bg-white shadow-lg mt-20 flex-col text-black h-92 py-4 px-6   rounded-md flex  w-[700px] absolute top-2 left-[36%]">
        <div className='flex flex-col justify-between relative'>
        <span  onClick={()=>setIsDialogueOpen((prev)=>!prev)} className=' h-8  w-8 m-2 absolute top-0 -right-4 flex  font-bold items-center justify-center rounded-full'>
            <img src="../../public/Flat_cross_icon.svg.png" alt="" />
        </span>
            <div className="flex text-lg font-semibold text-zinc-600  pt-16 w-full h-full flex-col ">
            <span> Page Number : {metaData[0].page_number}</span>
            <span> Layout Width : {metaData[0].layout_width}</span>
            <span> Layout Height : {metaData[0].layout_height}</span>
            <span> Cordinates : </span>
            <span> Top Left : X = {metaData[0]?.coordinates[0][0]} ,Y = {metaData[0]?.coordinates[0][1]}  </span>
            <span> Bottom Left : X = {metaData[0]?.coordinates[1][0]} ,Y = {metaData[0]?.coordinates[1][1]}  </span>
            <span> Bottom Right : X = {metaData[0]?.coordinates[2][0]} ,Y = {metaData[0]?.coordinates[2][1]}  </span>
            <span> Top Right : X = {metaData[0]?.coordinates[3][0]} ,Y = {metaData[0]?.coordinates[3][1]}  </span>
            
            </div>
        </div>
          </div>
  )
}

export default Popup