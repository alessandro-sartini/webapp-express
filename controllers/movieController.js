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
        image: req.imagePath + `${movie.image}`,
      };
    });

    res.json(movies);
  });
}

function show(req, res) {
  const { id } = req.params;
  const sql = "SELECT * FROM movies WHERE id = ?";
  const sqlReview = "SELECT * FROM reviews WHERE movie_id = ?";

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
        image: req.imagePath + movie.image,
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

function storeReview(req, res) {
  const { movie_id, name, vote, text } = req.body;

  // ci sono tutti?
  if (!movie_id || !name || !vote || !text) {
    return res.status(400).json({
      err: 400,
      message: "Tutti i campi (movie_id, name, vote, text) sono obbligatori",
    });
  }

  const sql =
    "INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)";

  connection.query(sql, [movie_id, name, vote, text], (err, result) => {
    if (err) {
      return res.status(500).json({
        err: 500,
        message: "Errore durante l'inserimento della recensione",
      });
    }

    res.status(201).json({
      message: "Recensione aggiunta con successo",
      review_id: result.insertId,
    });
  });
}

function storeMovie(req, res) {
  const { title, director, genre, release_year, abstract, image } = req.body;

  const sql = `
  INSERT INTO movies (title, director, genre, release_year, abstract, image) 
  VALUES (?,?,?,?,?,?)`;
  const releaseYearNumber = parseInt(release_year);

  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  console.log("Valore di image:", image);
  connection.query(
    sql,
    [title, director, genre, releaseYearNumber, abstract, image],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          err: 500,
          message: `error in store`,
        });
      }
      res.status(201).json({
        status: "success",
        message: "Film inserito con successo",
        id: results.insertId,
      });
    }
  );
}

export { index, show, destroy, storeReview, storeMovie };
