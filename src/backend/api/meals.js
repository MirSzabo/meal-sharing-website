const express = require("express");
const pool = require("./../database");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
router.use(bodyParser.json());

//Body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json()); //app.use(bodyParser.json()) ?????

router.get("/", (req, res) => {
  console.log(req.query);
  const { maxPrice } = req.query;
  const { availableReservations } = req.query;
  const { title } = req.query;
  const { createdAfter } = req.query;
  const { limit } = req.query;

  //Get meals that has a price smaller than maxPrice
  //http://localhost:3000/api/meals?maxPrice=90
  if (maxPrice) {
    pool.query(
      `SELECT * FROM meal WHERE price <= ${maxPrice}`,
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.json(results);
      }
    );
    //Get meals that still has available reservations
    //http://localhost:3000/api/meals?availableReservations=true
  } else if (availableReservations) {
    pool.query(
      `SELECT meal.id, meal.title, (meal.max_reservations-reservation.number_of_guests) AS available_reservations, reservation.number_of_guests FROM Meal
    JOIN reservation
    ON meal.id = reservation.meal_id
    WHERE number_of_guests < max_reservations;`,
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.json(results);
      }
    );
    //Get meals that partially match a title
    //http://localhost:3000/api/meals?title="pizz"
  } else if (title) {
    const titleQueryModified = title
      .toLowerCase()
      .replace(/"/g, "")
      .trim();
    pool.query(
      `SELECT * FROM meal WHERE title LIKE '%${titleQueryModified}%'`,
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.json(results);
      }
    );
    //Get meals that has been created after the date
    //http://localhost:3000/api/meals?createdAfter=2019-12-08
  } else if (createdAfter) {
    pool.query(
      `SELECT * FROM meal WHERE created_date >= '${createdAfter}'`,
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.json(results);
      }
    );
    //Only specific number of meals
    //http://localhost:3000/api/meals?limit=2
  } else if (limit) {
    const limitNumber = parseInt(limit.trim());
    pool.query(
      `SELECT * FROM meal LIMIT ${limitNumber}`,
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        res.json(results);
      }
    );
  } else if (!limit) {
    //all meals
    //http://localhost:3000/api/meals
    pool.query("SELECT * FROM meal", (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.json(results);
    });
  } else {
    return res.status(400).json({ msg: "Invalid query parameter" });
  }
});

//api/meals/	POST	Adds a new meal	POST api/meals/
router.post("/", (req, res) => {
  //const { body } = req;
  const meal = req.body;
  console.log("meal:", meal);
  pool.query("INSERT into meal SET ?", [meal], (error, results, fields) => {
    if (error) {
      return res.send(error);
    }
    res.json(results);
  });
});

//api/meals/{id}	GET	Returns meal by id	GET api/meals/2
router.get("/:id", (req, res) => {
  pool.query(
    "SELECT * FROM meal WHERE id=?",
    [req.params.id],
    (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.json(results);
      //res.send("added succesfully")
    }
  );
});

//api/meals/{id}	PUT	Updates the meal by id	PUT api/meals/2
router.put("/:id", (req, res) => {
  pool.query(
    "UPDATE meal SET `title` = ?, `description` = ?, `location` = ?, `when` = ?, `max_reservations` = ?, `price` = ?, `created_date` = ? WHERE `id`= ?",
    [
      req.body.title,
      req.body.description,
      req.body.location,
      req.body.when,
      req.body.max_reservations,
      req.body.price,
      req.body.created_date,
      req.body.id
    ],
    (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.send("Meal has been updated!");
    }
  );
});

//api/meals/{id}	DELETE	Deletes the meal by id	DELETE meals/2
router.delete("/:id", (req, res) => {
  console.log(req.body);
  pool.query(
    "DELETE FROM `meal` WHERE `id`=?",
    [req.body.id],
    (error, results, fields) => {
      if (error) {
        return res.send(error);
      }
      res.send("Meal has been deleted!");
    }
  );
});

module.exports = router;
