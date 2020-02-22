const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");

//api/reviews/	GET	Returns all reviews	GET api/reviews/
router.get("/", (req, res) => {
    pool.query("SELECT * FROM review", (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.json(results);
    });
  });
  
  //api/reviews/	POST	Adds a new review	POST api/reviews/
  router.post("/", (req, res) => {
    const review = req.body;
    pool.query("INSERT into review SET ?", review, (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.json(results);
    });
  });
  
  //api/reviews/{id}	GET	Returns review by id	GET api/reviews/2
  router.get("/:id", (req, res) => {
    pool.query(
      "SELECT * FROM review WHERE id=?",
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.json(results);
      }
    );
  });
  
  //api/reviews/{id}	PUT	Updates the review by id	PUT api/reviews/2
  router.put("/:id", (req, res) => {
    pool.query(
      "UPDATE review SET `title` = ?, `description` = ?, `meal_id` = ?, `stars` = ?, `created_date` = ? WHERE `id`= ?",
      [
        req.body.title,
        req.body.description,
        req.body.meal_id,
        req.body.stars,
        req.body.created_date,
        req.body.id
      ],
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.send("Review has been updated!");
      }
    );
  });
  
  //api/reviews/{id}	DELETE	Deletes the review by id	DELETE api/reviews/2
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    pool.query(
      "DELETE FROM `review` WHERE `id`=?",
      [id],
      //[req.body.id],
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.end("Review has been deleted!");
      }
    );
  });


module.exports = router;