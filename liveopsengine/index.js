const express = require("express");
const mongoose = require("mongoose");
const bodyparse = require("body-parser");
const UserRoutes=require("./routes/user")
const OfferRoutes = require("./routes/offer")
const SERVER_PORT = process.env.PORT || 5000
const app = express();
const url="mongodb://localhost:27017/user";
mongoose.connect(url).then(()=> {
    console.log("successfull connected to database");
}).catch(()=> {
    console.log("failed to connect to database");
});
app.use(bodyparse.json());
app.listen(SERVER_PORT, ()=> {
    console.log(`backend server is running  on ${SERVER_PORT }`)
});
app.use("/user",UserRoutes)
app.use("/offer",OfferRoutes)