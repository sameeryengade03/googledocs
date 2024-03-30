import { useState } from "react";
import { AiFillPrinter, AiOutlineHighlight } from "react-icons/ai";
import { BsLink } from "react-icons/bs";

import { ImFontSize, ImTextColor } from "react-icons/im";
import {
  icons,
  fontSizeList,
  fontFamilyList,
  emojiList,
  zoomList
} from "../../Fixture/Icons";
import style from "./NavbarResponsive.module.css";
import { RxImage } from "react-icons/rx";
export default function NavbarResponsive({ printDiv }) {
  const [emoji, setEmoji] = useState("&#128514;");
  const [zoom, setZoom] = useState("100%");
  const [fontSize, setFontSize] = useState("Font Size");
  const [fontName, setFontName] = useState("Font Style");
  const [color, setColor] = useState("#000000");
  const [higlightColor, setHiglightColor] = useState("#000000");
  const [link, setLink] = useState("");
  const [show, setShow] = useState(false);

  function handleAction(element) {
    document.execCommand(`${element.action}`);
  }
  function handleFontColor(e) {
    setColor(e.target.value);
    console.log(e.target.value);
    document.execCommand("foreColor", false, e.target.value);
  }
  function handleFontSize(e) {
    setFontSize(e.target.value);
    document.execCommand("fontSize", false, e.target.value);
  }
  function handleHighlightColor(e) {
    setHiglightColor(e.target.value);
    document.execCommand("backColor", false, e.target.value);
  }
  function handleFontStyle(e) {
    setFontName(e.target.value);
    document.execCommand("fontName", false, e.target.value);
    console.log(e.target.value);
  }
  function handleEmoji(e) {
    setEmoji(e.target.value);

    if (e.target.value === "Smile") {
      document.execCommand("insertHTML", false, "&#128514");
    } else if (e.target.value === "Thumbs Up") {
      document.execCommand("insertHTML", false, "&#128077");
    } else if (e.target.value === "Thumbs Down") {
      document.execCommand("insertHTML", false, "&#128078");
    }
    console.log(e.target.value);
  }

  function handleZoom(e){
   setZoom(e.target.value)
  }

  function handleOpen(value) {
    setShow(!show ? true : false);
    if (value === "link") {
      document.execCommand("createLink", false, link);
    } else {
      document.execCommand("insertImage", false, link);
    }
    setLink("");
  }

  const handlePrint = () => {
    let printContents = printDiv.current.innerHTML;
    console.log(printContents);
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };
  return (
    <div className={style.main}>
    <div className={style.dropdown}>
        <div className={style.fontStyleBox}>
          <select onChange={handleZoom}>
            <option>100%</option>
            {zoomList.map((x, i) =>
              <option key={i}>
                {x}
              </option>
            )}
          </select>
        </div>
        <div className={style.fontStyleBox}>
          <select onChange={handleEmoji}>
            <option>Emoji</option>
            {emojiList.map((x, i) =>
              <option key={i}>
                {x.icon}
              </option>
            )}
          </select>
        </div>

        <div className={style.fontStyleBox}>
          <select
            className={style.fontStyle}
            id="fontStyle"
            onChange={handleFontStyle}
          >
            <option>
              {fontName}
            </option>
            {fontFamilyList.map(x =>
              <option key={x}>
                {x}
              </option>
            )}
          </select>
        </div>

        <div className={style.fontSize}>
          <label htmlFor="fontSize">
            <span>
              <ImFontSize className={style.icon} />
            </span>
          </label>
          <select id="fontSize" onChange={handleFontSize}>
            <option>3</option>
            {fontSizeList.map(x =>
              <option key={x}>
                {x}
              </option>
            )}
          </select>
        </div>
    </div>
      <div className={style.wrapper}>
        {icons.slice(0, 2).map((element, index) =>
          <button key={index} onClick={() => handleAction(element)}>
            {element.icon}
          </button>
        )}

        <button onClick={handlePrint}>
          <AiFillPrinter />
        </button>
        {icons.slice(3, 5).map((element, index) =>
          <button key={index} onClick={() => handleAction(element)}>
            {element.icon}
          </button>
        )}


        {icons.slice(5, 9).map((element, index) =>
          <button key={index} onClick={() => handleAction(element)}>
            {element.icon}
          </button>
        )}

        <button>
          <label htmlFor="color">
            <ImTextColor style={{ color: color }} />
          </label>
          <input
            className={style.input}
            id="color"
            type="color"
            value={color}
            onChange={handleFontColor}
          />
        </button>

        <button>
          <label htmlFor="highlighColor">
            <AiOutlineHighlight style={{ zIndex: "1", color: higlightColor }} />
          </label>
          <input
            className={style.input}
            id="highlighColor"
            type="color"
            value={higlightColor}
            onChange={handleHighlightColor}
          />
        </button>

        <button onClick={() => handleOpen("link")}>
          <label htmlFor="link">
            <BsLink />
          </label>
        </button>
        <button onClick={() => handleOpen("insertImage")}>
          <label htmlFor="link">
            <RxImage />
          </label>
        </button>

        {icons.slice(9).map((element, index) =>
          <button key={index} onClick={() => handleAction(element)}>
            {element.icon}
          </button>
        )}
      </div>
      {show
        ? <div className={style.linkBox}>
            <h4>Paste your Link Here....</h4>

            <input
              id="link"
              value={link}
              type="url"
              onChange={e => setLink(e.target.value)}
            />
          </div>
        : ""}
    </div>
  );
}
