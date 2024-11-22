import React from 'react'

const Popup = ({metaData,setIsDialogueOpen}) => {
    console.log("metadata",metaData)
  return (
    <div className="bg-white flex-col text-black h-80    rounded-md flex  w-[500px] absolute top-4 left-10">
        <div className='flex flex-col justify-between relative'>
        <span  onClick={()=>setIsDialogueOpen((prev)=>!prev)} className='   bg-red-500 h-8  w-8 m-4 absolute top-2 right-2 flex text-white font-bold items-center justify-center rounded-full'>x</span>
            <div className="flex justify-center pt-24 w-full h-full flex-col items-center">
            <span> Top : {metaData[0].top}</span>
            <span> height : {metaData[0].height}</span>
            <span> left : {metaData[0].left}</span>
            <span> width : {metaData[0].width}</span>
            </div>
        </div>
          </div>
  )
}

export default Popup