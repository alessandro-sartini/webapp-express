// import connection from"./data/db_movies.js"
import express from "express"
import router from "./routers/movieRouter.js";
const app = express();

app.use("/movies",router);

const port = process.env.SERVER_PORT;

app.use(express.static('public'));

app.use(express.json());




app.listen(port, () => {
    console.log('port '+ port)
});


