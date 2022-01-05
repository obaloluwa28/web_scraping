import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./airpeace.css";
import Navbar from "../../components/Navbar";
import Datepiccker from "../../components/Datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";

function Airpeace() {
  const { fileData, setFileData } = useState();
  const [textfield, setTextfield] = useState("");
  const [scrapedata, setScrapedata] = useState([]);
  const [loading, setLoading] = useState();
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    Axios.get("http://localhost:5001/getnewsaves").then((res) =>
      setScrapedata(res.data)
    );
  }, []);

  const Submitbutton = (e) => {
    e.preventDefault();
    const obj = {
      url: textfield,
    };

    console.log(obj);
    Axios.post("http://localhost:5001/airpeace", obj).then((res) => {
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

  // const onsubmit = (e) => {
  //   e.preventDefault();
  //   const obj2 = {
  //     form: currmail,
  //     password: currpassword,
  //   };
  //   Axios.post("http://localhost:5001/apbook", obj2)
  //     .then((res) => {
  //       var rec_data = res.data;

  //       console.log("OBA DATA:", rec_data);
  //       if (res.status === 202) {
  //         console.log("Created:", res.status);
  //         toast.success("Login Successful!", {
  //           position: toast.POSITION.BOTTOM_RIGHT,
  //         });
  //         history.push("/homepage");
  //       } else if (res.status === 204) {
  //         toast.error("Incorrect Username or Password", {
  //           position: toast.POSITION.BOTTOM_RIGHT,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Another ERROR:", err);
  //     });
  //   // console.log(obj);
  // };

  return (
    <div className="maindiv">
      <Navbar />
      {/* https://www.flyairpeace.com/ */}
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

      <div className="booking-online">
        <div className="inner-forn-heading">
          <div id="tab">Book a flight</div>
          <div id="tab">Manage Booking</div>
          <div id="tab">Online Check-in</div>
          <div id="tab">Agent Login</div>
        </div>
        <div className="inner-form">
          <div className="paydiv">
            <button id="payin">Pay In</button>
            <select id="select_options">
              <option value="NGN">NGN Naira</option>
              <option value="NGN">US Dolar</option>
              <option value="NGN">Ghana Cedis</option>
            </select>
          </div>
          <div className="bodydiv">
            <div className="bodydiv-first">
              <select className="bodydiv-first-left">
                <option selected>From</option>
                <option value="ABJ">Abuja</option>
                <option value="ACC">Accra</option>
                <option value="AKR">Akure</option>
                <option value="ABB">Asaba</option>
                <option value="BNJ">Banjul</option>
                <option value="BNI">Benin</option>
                <option value="CBQ">Calabar</option>
              </select>

              <select className="bodydiv-first-right">
                <option selected>To</option>
                <option value="ABJ">Abuja</option>
                <option value="ACC">Accra</option>
                <option value="AKR">Akure</option>
                <option value="ABB">Asaba</option>
                <option value="BNJ">Banjul</option>
                <option value="BNI">Benin</option>
                <option value="CBQ">Calabar</option>
              </select>
            </div>

            <div className="bodydiv-sec">
              <button className="bodydiv-sec-lef">Return</button>
              <button className="bodydiv-sec-lef-1">One-Way</button>
            </div>

            <div className="bodydiv-first">
              <DatePicker
                className="bodydiv-trd-left"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <DatePicker
                className="bodydiv-trd-right"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div className="bodydiv-first">
              <select className="bodydiv-first-left">
                <option value="1ad" selected>
                  1 Adult
                </option>
                <option value="2ad">2 Adult (12yrs+)</option>
                <option value="3ad">2 Adult (12yrs+)</option>
              </select>

              <select className="bodydiv-first-right">
                <option selected>To</option>
                <option value="1ch" selected>
                  0 Child
                </option>
                <option value="2ch">1 Child</option>
                <option value="3ch">2 Child (2-11)</option>
              </select>
            </div>

            <div className="bodydiv-first">
              <button className="proceed">Continue</button>
            </div>
          </div>
        </div>
      </div>

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

export default Airpeace;
