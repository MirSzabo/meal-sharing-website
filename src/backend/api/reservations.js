const express = require("express");
const app = express();
const router = express.Router();
const pool = require("./../database");

// api/reservations/	GET	Returns all reservations	GET api/reservations/
router.get("/", (req, res) => {
    pool.query("SELECT * FROM reservation", (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.json(results);
    });
  });
  
  //api/reservations/	POST	Adds a new reservation	POST api/reservations/
  router.post("/", (req, res) => {
    const reservation = req.body;
    console.log("reservation:", reservation);
    pool.query("INSERT into reservation SET ?", reservation, (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.json(results);
    });
  });
  
  //api/reservations/{id}	GET	Returns reservation by id	GET api/reservations/2
  router.get("/:id", (req, res) => {
    pool.query(
      "SELECT * FROM reservation WHERE id=?",
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.json(results);
      }
    );
  });
  
  //api/reservations/{id}	PUT	Updates the reservation by id	PUT api/reservations/2
  router.put("/:id", (req, res) => {
    pool.query(
      "UPDATE reservation SET `number_of_guests` = ?, `meal_id` = ?, `created_date` = ? WHERE `id`= ?",
      [
        req.body.number_of_guests,
        req.body.meal_id,
        req.body.created_date,
        req.body.id
      ],
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.send("Reservation has been updated!");
      }
    );
  });
  
  //api/reservations/{id}	DELETE	Deletes the reservation by id	DELETE api/reservations/2
  router.delete("/:id", (req, res) => {
    console.log(req.body);
    pool.query(
      "DELETE FROM `reservation` WHERE `id`=?",
      [req.body.id],
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.end("Reservation has been deleted!");
      }
    );
  });

module.exports = router;