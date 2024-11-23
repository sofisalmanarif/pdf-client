import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";


import "@react-pdf-viewer/core/lib/styles/index.css";
import axios from "axios";
import RenderHighlightAreas from "../components/RenderHighlightedAreas";
import Popup from "../components/Popup";


// Import styles
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

const ViewPdf = () => {
  const { filename } = useParams();
  const [pdfData, setPdfData] = useState(null);
  const [cordinatesArray, setCordinatesArray] = useState(null);
  const [metaData, setMetaData] = useState(null)

  const [isDilogueOpen,setIsDialogueOpen] = useState(false)
  

  function findElement(id) {
   if(!(pdfData[0].type ==="CompositeElement")){
    let element = pdfData
    .filter((element) => element.element_id === id)
    .map((element) => element.metadata);
  let extractedData = element.map((item) => ({
    coordinates: item.coordinates.points,
    page_number: item.page_number,
    layout_width: item.coordinates.layout_width,
    layout_height: item.coordinates.layout_height,
  }));
  console.log("extracted",extractedData[0]);
  setMetaData(extractedData)
  // console.log("now meta data",metaData)

  const transformedData = extractedData.map((item) => {
    const top = item.coordinates[0][1] / (item.layout_height / 100); // Top as percentage
    const height =
      (item.coordinates[1][1] - item.coordinates[0][1]) /
      (item.layout_height / 100); // Height as percentage
    const width =
      (item.coordinates[2][0] - item.coordinates[0][0]) /
      (item.layout_width / 100); // Width as percentage
    const left = item.coordinates[0][0] / (item.layout_width / 100); // Left as percentage

    return {
      pageIndex: item.page_number - 1,
      top,
      height,
      width,
      left,
    };
  });

  setCordinatesArray(transformedData);
  console.log("cord-array",cordinatesArray);
  
   }
   else if(pdfData[0].type ==="CompositeElement"){
    // console.log("alag json hai")
    // console.log("pdf-data",pdfData);
    const extractedData = pdfData.filter((element)=>element.element_id ==id)[0].metadata.map((smallElement)=>smallElement)
    console.log("extractedData",extractedData)
    const metadata= extractedData.map((elem)=> 
      ( 
      {coordinates:elem.metadata.coordinates,
      page_number : elem.metadata.page_number,
      type:elem.type
    }))
    setMetaData(metadata)
    console.log("metadata",metadata)
    // let extraxtedMetaData = metadata.map((item) => (item.page_number,item.coordinates))
    //  metadata.map((item) => item.points.map((item,idx)=>console.log(idx ,item)))
    const resultArray = metadata.map((item) => {
      const points = item.coordinates.points;
      const top = points[0][1]/(item.coordinates.layout_height/100); // y-coordinate of the top-left point
      const left = points[0][0]/(item.coordinates.layout_width/100); // x-coordinate of the top-left point
      const height = (points[1][1] - points[0][1])/(item.coordinates.layout_height/100); // Difference in y-coordinates
      const width = (points[2][0] - points[0][0])/(item.coordinates.layout_width/100); // Difference in x-coordinates
    
      return {
        top,
        left,
        height,
        width,
        pageIndex: item.page_number - 1, // Convert to 0-based index
      };
    });
    
    // console.log(resultArray);
    setCordinatesArray(resultArray)
    // console.log("cordarray",cordinatesArray)
    
   }
  }

 
  

  async function getPdfdata() {
    try {
      const { data } = await axios.get(
        `https://pdfserver-x314vhv1.b4a.run/data/${filename}`
      );
      setPdfData(data);
        console.log("json data",data[0].type);
    } catch (error) {
      console.error("Error fetching PDF data:", error);
    }
  }

  useEffect(() => {
    if (filename) {
      getPdfdata();
    }
  }, [filename]); 

  return (
    <div className="w-full h-screen flex">
      <div className=" w-[70%]">
        <div className="flex pl-10 items-center justify-between">
          <Link  className=" fixed top-8 left-20" to="/">
            <img className="h-10 w-10" src="/back-icon.png" alt="" />
          </Link>
          <h1 className="text-3xl ml-28 font-bold text-center mt-10">{filename}</h1>
        </div>
        <div className="h-full  mt-5">
          {pdfData ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              {cordinatesArray ? (
                <RenderHighlightAreas
                  fileUrl={`https://pdfserver-x314vhv1.b4a.run/files/${filename}`}
                  areas={cordinatesArray}
                />
              ) : (
                <Viewer theme={Popup} fileUrl={`https://pdfserver-x314vhv1.b4a.run/files/${filename}`} />
              )}
            </Worker>
          ) : (
            <p>Loading PDF...</p>
          )}
        </div>
      </div>
      <div className="w-[30%]   mt-20 py-2 px-10 h-screen overflow-y-auto">
        {pdfData &&
          pdfData.map((element) => (
            <div onClick={() => findElement(element.element_id)} className="flex border-2 border-gray-200 relative px-4 justify-between items-center bg-zinc-100 hover:bg-zinc-300 mb-4 rounded-md">
              <div  className=" w-[98%] flex mb-2 rounded-md px-2">
              <p
              onClick={() => findElement(element.element_id)}
              key={element.element_id}
              className="text-md max-w-[94%] mt-12 mb-10 text text-justify  hover:text-black ease-in-out duration-500"
            >
              {element.text}
            </p>
              </div>
             <div>
              <img onClick={()=>setIsDialogueOpen((prev)=>!prev)} src="../../public/app.png" className="h-6 absolute top-6 right-6 cursor-pointer" alt="" />
             </div>
             

              
            </div>
          ))}
{
                isDilogueOpen && <Popup metaData={metaData} setIsDialogueOpen={setIsDialogueOpen}/>
              }
          
      </div>
    </div>
  );
};

export default ViewPdf;


















    //   console.log("top" ,(extractedData[0].coordinates[0][1]/(extractedData[0].layout_height/100)),extractedData[0].layout_height);

    //   console.log("height" ,((extractedData[0].coordinates[1][1] - extractedData[0].coordinates[0][1])/(extractedData[0].layout_height/100)),extractedData[0].layout_height);

    //   console.log("width" ,((extractedData[0].coordinates[2][0] - extractedData[0].coordinates[1][0])/(extractedData[0].layout_width/100)),extractedData[0].layout_width);

    //   console.log("left",(extractedData[0].coordinates[0][0]/(extractedData[0].layout_width/100)),extractedData[0].layout_width)