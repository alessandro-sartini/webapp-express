import connection from "../data/db_movies.js";

function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, response) => {
    if (err) {
      return res.status(500).json({
        err: 500,
        message: "Errore query index",
      });
    }

    const movies = response.map((movie) => {
      return {
        ...movie,
        image: req.imagePath + `${movie.title.toLowerCase()}.jpg`,
      };
    });

    res.json(movies);
  });
}

function show(req, res) {
  const { id } = req.params;
  const sql = "SELECT * FROM movies WHERE id = ?";
  const sqlReview = "SELECT * FROM reviews WHERE id = ?";

  connection.query(sql, [id], (err, response) => {
    if (err)
      return res.status(500).json({
        error: "Errore SHOW function",
      });

    if (response.length === 0) {
      return res.status(404).json({
        err: 404,
        message: "Sembra non ci siano dati presenti",
      });
    }

    const movie = response[0];

    connection.query(sqlReview, [id], (err, resultWReview) => {
      if (err) {
        return res.setStatus(500).json({
          err: 500,
          message: "Errore nella show delle reviews ",
        });
      }
      movie.reviews = resultWReview;
      res.json({
        ...movie,
        image: req.imagePath + movie.title.toLowerCase() + ".jpg",
      });
    });
  });
}

function destroy(req, res) {
  const { id } = req.params;

  const sql = "SELECT * FROM movies WHERE id = ?";

  connection.query(sql, [id], (err) => {
    if (err) {
      return res.staus(500).json({
        err: 500,
        response: "errore nel serve",
      });
    }

    res.setStatus(204);
  });
}

export { index, show, destroy };
