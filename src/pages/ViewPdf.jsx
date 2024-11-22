import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import axios from "axios";
import RenderHighlightAreas from "../components/RenderHighlightedAreas";
import Popup from "../components/Popup";

const ViewPdf = () => {
  const { filename } = useParams();
  const [pdfData, setPdfData] = useState(null);
  const [cordinatesArray, setCordinatesArray] = useState(null);

  const [isDilogueOpen,setIsDialogueOpen] = useState(false)

  function findElement(id) {
    let element = pdfData
      .filter((element) => element.element_id === id)
      .map((element) => element.metadata);
    let extractedData = element.map((item) => ({
      coordinates: item.coordinates.points,
      page_number: item.page_number,
      layout_width: item.coordinates.layout_width,
      layout_height: item.coordinates.layout_height,
    }));
    console.log(extractedData[0]);

    //   console.log("top" ,(extractedData[0].coordinates[0][1]/(extractedData[0].layout_height/100)),extractedData[0].layout_height);

    //   console.log("height" ,((extractedData[0].coordinates[1][1] - extractedData[0].coordinates[0][1])/(extractedData[0].layout_height/100)),extractedData[0].layout_height);

    //   console.log("width" ,((extractedData[0].coordinates[2][0] - extractedData[0].coordinates[1][0])/(extractedData[0].layout_width/100)),extractedData[0].layout_width);

    //   console.log("left",(extractedData[0].coordinates[0][0]/(extractedData[0].layout_width/100)),extractedData[0].layout_width)
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
    console.log(cordinatesArray);
  }

  async function getPdfdata() {
    try {
      const { data } = await axios.get(
        `https://pdfserver-x314vhv1.b4a.run/data/${filename}`
      );
      setPdfData(data);
      //   console.log(data);
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
      <div className="pl-20 w-[70%]">
        <div className="flex items-center justify-between">
          <Link className="px-4 py-2 rounded-md bg-blue-400 text-white" to="/">
            Back
          </Link>
          <h1 className="text-3xl font-bold text-center mt-10">{filename}</h1>
        </div>
        <div className="h-screen mt-5">
          {pdfData ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              {cordinatesArray ? (
                <RenderHighlightAreas
                  fileUrl={`https://pdfserver-x314vhv1.b4a.run/files/${filename}`}
                  areas={cordinatesArray}
                />
              ) : (
                <Viewer fileUrl={`https://pdfserver-x314vhv1.b4a.run/files/${filename}`} />
              )}
            </Worker>
          ) : (
            <p>Loading PDF...</p>
          )}
        </div>
      </div>
      <div className="w-[30%] relative  py-10 px-10 h-screen overflow-y-auto">
        {pdfData &&
          pdfData.map((element) => (
            <div className="flex  justify-between items-center">
            <p
              onClick={() => findElement(element.element_id)}
              key={element.element_id}
              className="text-lg my-10 text text-zinc-300 hover:font-bold hover:text-white ease-in-out duration-500"
            >
              {element.text}
            </p>
              <span onClick={()=>setIsDialogueOpen((prev)=>!prev)} >```</span>

              
            </div>
          ))}
{
                isDilogueOpen && <Popup metaData={cordinatesArray} setIsDialogueOpen={setIsDialogueOpen}/>
              }
          
      </div>
    </div>
  );
};

export default ViewPdf;
