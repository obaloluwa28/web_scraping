import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./arik.css";
import Navbarak from "../../components/Navbarak";

const Arik = () => {
  const { fileData, setFileData } = useState();
  const [textfield, setTextfield] = useState("");
  const [scrapedata, setScrapedata] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    Axios.get("http://localhost:5001/getarik").then((res) => {
      setScrapedata(res.data);
      console.log(res.data);
    });
  }, []);

  const Submitbutton = (e) => {
    e.preventDefault();
    const obj = {
      url: textfield,
    };

    console.log(obj);
    Axios.post("http://localhost:5001/arikair", obj).then((res) => {
      console.log("Success");
      console.log(`Response: ${res.data}`);
      setLoading(res.data);
    });
  };

  const handleonchange = (e) => {
    console.log(e.target.value);
    if (e.target.name === "urlval") {
      setTextfield(e.target.value);
    }
  };
  return (
    <div className="arik-container">
      <Navbarak />
      <div id="heading">Web Scraping</div>
      <div>
        <span className="fieldiv">
          <label id="urllabel">Url: </label>
          <input
            id="urltxtfield"
            name="urlval"
            onChange={handleonchange}
            placeholder="Place Url Here"
          />
        </span>
        <div className="buttncontain">
          <button onClick={Submitbutton} id="scrapbutton">
            Scrap
          </button>

          <button id="dwnldbutton">Download</button>
        </div>
      </div>
      <div className="loadingstatus">{loading}</div>
      <div className="tablecontainer">
        <div className="tablehead">Scraped Data</div>
        <table id="scrapedtab">
          <thead>
            <tr className="headrow">
              <th id="thcell">Top Destination</th>
              <th id="thcell">Telephone</th>
              <th id="thcell">Address</th>
              <th id="thcell">About Us</th>
              <th id="thcell">Search</th>
              <th id="thcell">Select</th>
              <th id="thcell">Footer</th>
            </tr>
          </thead>
          <tbody>
            {scrapedata.map((itemm) => (
              <tr className="bodyrow">
                <td id="tbcell">{itemm.Topdestinations}</td>
                <td id="tbcell">{itemm.Telephone}</td>
                <td id="tbcell">{itemm.Address}</td>
                <td id="tbcell">{itemm.About_us}</td>
                <td id="tbcell">{itemm.Search}</td>
                <td id="tbcell">{itemm.Selectt}</td>
                <td id="tbcell">{itemm.Footer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Arik;
