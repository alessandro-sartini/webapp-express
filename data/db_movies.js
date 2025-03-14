import mysql from "mysql2"

const connection = mysql.createConnection({
    
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
});


connection.connect((error) => {
    if (error) {
        return error;
    }

    console.log("Connessione al DB Films avvenuta con successo");
});

export default connection; 