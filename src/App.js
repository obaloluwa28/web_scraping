import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { CSVLink } from "react-csv";

function App() {
  const { fileData, setFileData } = useState();
  const [textfield, setTextfield] = useState("");
  const [scrapedata, setScrapedata] = useState([]);

  const [loading, setLoading] = useState();
  // const [fileHeaders] = useState([
  //   { label: "First Name", key: "userDetails.firstName" },
  //   { label: "Last Name", key: "userDetails.lastName" },
  //   { label: "Last Name", key: "userDetails.lastName" },
  //   { label: "Location", key: "userDetails.location" },
  //   { label: "Status", key: "status" },
  // ]);

  useEffect(() => {
    Axios.get("http://localhost:5001/getnewsaves").then((res) =>
      setScrapedata(res.data)
    );
  }, []);

  // const handleDataFetch = async () => {
  //   const response = await fetch("https://localhost:5000/results");
  //   const respJSON = await response.json();
  //   setFileData(respJSON);
  // };

  const Submitbutton = (e) => {
    e.preventDefault();
    const obj = {
      url: textfield,
    };

    console.log(obj);
    Axios.post("http://localhost:5001/newsaves", obj).then((res) => {
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
    <div className="maindiv">
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
              <th id="thcell">Our Vision</th>
              <th id="thcell">Our Mission</th>
              <th id="thcell">Why Us</th>
              <th id="thcell">Local Content</th>
              <th id="thcell">Address</th>
            </tr>
          </thead>
          <tbody>
            {scrapedata.map((itemm) => (
              <tr>
                <td id="tbcell">{itemm.Ourvision}</td>
                <td id="tbcell">{itemm.Ourmission}</td>
                <td id="tbcell">{itemm.Whyus}</td>
                <td id="tbcell">{itemm.Localcontent}</td>
                <td id="tbcell">{itemm.Address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
