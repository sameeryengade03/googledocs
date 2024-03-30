import React, { useState, useRef } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import style from "./HomePage.module.css";
import { BsStarFill } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import NavbarResponsive from "../../Component/NavbarResponsive/NavbarResponsive";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export default function HomePage() {
  const [color, setColor] = useState("black");
  const [title, setTitle] = useState("Untitled Document");
  const printDiv = useRef();

 
  async function handleDownload() {
    const sheetContent = document.getElementById(`printablediv`);
    const canvas = await html2canvas(sheetContent, { dpi: 300 });
    const imageData = canvas.toDataURL("image/png", 1.0);
    const pdfDoc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: false,
    });
    pdfDoc.addImage(imageData, "PNG", 0, 0, 210, 297, "", "FAST");
    pdfDoc.save(`${title}.pdf`);
  }
  
  

  return (
    <div>
      <div className={style.main}>
        <div className={style.subMain}>
          <img
            src="https://1000logos.net/wp-content/uploads/2020/05/Google-Docs-logo.jpg"
            alt="logo"
            className={style.icon}
          />
         <input
              value={title}
              className={style.input}
              onChange={(e) => setTitle(e.target.value)}
            /><BsStarFill
              className={style.star}
              onClick={() => setColor(color === "black" ? "yellow" : "black")}
              style={{ color: color }}
            />
         
        </div>
         <div className={style.navbar}>
        <Navbar printDiv={printDiv}/>
        </div>
        <div className={style.navbarResponsive}>
        <NavbarResponsive printDiv={printDiv}/>
        </div>
        <div className={style.wrapper}>
          <div
            ref={printDiv}
            id="printablediv"
            className={style.textArea}
            contentEditable="true"
          />
        </div>
      </div>
      <div onClick={handleDownload} className={style.download}>
        <HiDownload />
      </div>
    </div>
  );
}
