const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

/* Port setup*/
const PORT = process.env.PORT || 5000;

/* Cors Setup */
app.use(cors());
app.use(express.json());

/* import routes*/
const routehandler = require("./router");

/* route middlewares */
app.use("/api", routehandler);

/* Serve static files in production */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public"));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
  );
}

/**Connect to mongoDB */
mongoose.connect(
  `mongodb://${user}:${pass}@mongodb:27017/Hospital?authSource=admin`,
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  },
  (err) => {
    if(err) {
      console.log('Failed to connect to database')
      console.log(err)
    }else{
      console.log('connected to database')
      app.listen(PORT, () => console.log("server is started at port " + PORT));
    }
  }
)

/**Listen on Port */

