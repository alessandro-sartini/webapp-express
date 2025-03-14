import connection from "../data/db_movies.js";

function index(req, res) {
    
    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, response) => {
        
        if (err) {
            return res.status(500)
                .json({
                
                    err: 500,
                    message: 'Errore query index'
                });
        };

        res.json(response)

    });

};
function show(req, res) {
    
    console.log('ciao')

};


export {
    index,
    show
}