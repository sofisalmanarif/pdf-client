import React from 'react'

const Popup = ({metaData=[],setIsDialogueOpen}) => {
    console.log("metadata in popup",metaData)
  return (
    <div>

    {
      metaData.length == 1? 
      <div className="bg-white  shadow-lg px-10 mt-20 flex-col text-black h-auto   py-6  rounded-md flex  w-[600px] absolute top-2 left-[36%]">
      <div className='flex flex-col justify-between relative'>
      <span  onClick={()=>setIsDialogueOpen((prev)=>!prev)} className='hover:rotate-45 ease-in-out duration-300 h-8 cursor-pointer w-8 mx-2 absolute -top-2 -right-6 flex  font-bold items-center justify-center rounded-full'>
          <img src="/cross-icon.png" alt="" />
      </span>
          <div className="flex text-sm font-semibold text-zinc-600 border  px-2 py-4 rounded-md bg-gray-100 mt-10 w-full h-full flex-col ">
          <div className='flex flex-col'>
          <h3 className='text-black mb-1 text-xl'>Details of Highlighted Element </h3>
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
        </div>: 
        <div className="bg-white shadow-lg mt-20 flex-col text-black h-auto py-4 px-6   rounded-md flex  w-auto absolute top-2 left-[20%]">
        <div className='flex flex-col justify-between relative'>
        <span  onClick={()=>setIsDialogueOpen((prev)=>!prev)} className='hover:rotate-45 ease-in-out duration-300 h-8 cursor-pointer w-8 mx-2 absolute top-0 -right-4 flex  font-bold items-center justify-center rounded-full'>
        <img src="/cross-icon.png" alt="" />
        </span>
            <div className="flex text-sm font-semibold text-zinc-600  pt-10 w-auto h-full flex-col ">
            <div className='grid grid-cols-3 '>
      {metaData.map((data, index) => (
        <div key={index} className=' m-2 p-10 text-sm font-semibold text-zinc-600 border  px-4 py-4 rounded-md bg-gray-100'>
          <h3 className='text-black mb-1 text-xl'>Details of Highlighted Element {index + 1}</h3>
          <p>Page Number: {data.page_number}</p>
          <p>Layout Width: {data.coordinates.layout_width}</p>
          <p>Layout Height: {data.coordinates.layout_height}</p>
          <p>Type: {data.type}</p>
          <p>Coordinates:</p>
          <ul>
            <li>
              Top Left: X = {data.coordinates.points[0][0]}, Y = {data.coordinates.points[0][1]}
            </li>
            <li>
              Bottom Left: X = {data.coordinates.points[1][0]}, Y = {data.coordinates.points[1][1]}
            </li>
            <li>
              Bottom Right: X = {data.coordinates.points[2][0]}, Y = {data.coordinates.points[2][1]}
            </li>
            <li>
              Top Right: X = {data.coordinates.points[3][0]}, Y = {data.coordinates.points[3][1]}
            </li>
          </ul>
        </div>
      ))}
    </div>
            
            </div>
        </div>
          </div>
    }
    </div>
    
  )
}

export default Popup





















{/* <span> Page Number : {metaData[0].page_number}</span>
            <span> Layout Width : {metaData[0].layout_width}</span>
            <span> Layout Height : {metaData[0].layout_height}</span>
            <span> Cordinates : </span>
            <span> Top Left : X = {metaData[0]?.coordinates[0][0]} ,Y = {metaData[0]?.coordinates[0][1]}  </span>
            <span> Bottom Left : X = {metaData[0]?.coordinates[1][0]} ,Y = {metaData[0]?.coordinates[1][1]}  </span>
            <span> Bottom Right : X = {metaData[0]?.coordinates[2][0]} ,Y = {metaData[0]?.coordinates[2][1]}  </span>
            <span> Top Right : X = {metaData[0]?.coordinates[3][0]} ,Y = {metaData[0]?.coordinates[3][1]}  </span> */}