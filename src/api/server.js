require("dotenv").config();

// NextJS
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

//Express
const express = require("express");
const bodyParser = require("body-parser");
let date = require("./routes/date");

nextApp.prepare().then(() => {
  // express code here
  const app = express();

  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );

  app.use(bodyParser.json());

  app.get("/api", (req, res) => {
    res.status(200).json({
      unix: new Date().valueOf(),
      UTC: new Date().toUTCString(),
    });
  });

  app.use("/api", date);

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  let PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(
      `Node is listening on port ${PORT}. Go to http://localhost:${PORT}`
    )
  );
});

module.exports = nextApp;
