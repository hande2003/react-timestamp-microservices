import { useEffect, useState } from "react";
import Head from "next/head";
const axios = require("axios");

let Result = ({ result }) => {
  return (
    <div className="col-8 card mx-auto">
      <div className="card-body text-center">
        <h4 className="card-text">{result.unix}</h4>
        <h3 className="card-text">{result.UTC}</h3>
      </div>
    </div>
  );
};

function Main() {
  let [actionAPI, setActionAPI] = useState(() => {
    let date = new Date().getTime();
    return "/api/" + date;
  });

  let [result, setResult] = useState(() => "");

  let handleActionAPI = () => {
    let inputValue = document.getElementById("date").value;
    setActionAPI("/api/" + inputValue);
  };

  useEffect(() => {
    axios.get(actionAPI).then(
      (result) => {
        setResult(() => result.data);
      },
      (err) => {
        alert("Invalid Date Format");
        document.getElementById("date").value = "";
      }
    );
  }, [actionAPI]);
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
          crossOrigin="anonymous"
          defer
        ></script>
      </Head>
      <div className="container-fluid row vh-100 align-items-center">
        <div className="col-6 card mx-auto">
          <div className="card-body">
            <h3 className="card-title text-center">TimeStamp Microservices</h3>

            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                Date
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter date"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="date"
              />
            </div>
            <div id="dateInfo" className="form-text mb-3">
              Date can only be in either unix format or yyyy-mm-dd format
            </div>
            <button className="btn btn-primary w-100" onClick={handleActionAPI}>
              Submit
            </button>
          </div>
        </div>
        <Result result={result}></Result>
      </div>
    </>
  );
}

export default Main;
