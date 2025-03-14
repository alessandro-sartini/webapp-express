// import connection from"./data/db_movies.js"
import express from "express"
import router from "./routers/movieRouter.js";
import handleImgPath from "./middlewares/handleImgPath.js";

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.static('public'));
//! middlewares immagini
app.use(handleImgPath);


app.use(express.json());


app.use("/movies",router);


app.listen(port, () => {
    console.log('port '+ port)
});


