const express = require("express"); //import the Express application object
const app = express(); //use Express
const router = express.Router(); // get a Router object
const pool = require("./database");

const mealsRouter = require("./api/meals");//link the meal file
const reservationsRouter = require("./api/reservations.js");
const reviewsRouter = require("./api/reviews.js");

const port = process.env.PORT || 5000; //define the port where we will run the server
// For week4 no need to look into this!
const path = require("path");
// Serve the built client html
const buildPath = path.join(__dirname, "../../dist"); 
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

router.use("/meals", mealsRouter); //route path which responds only to HTTP USE requests
router.use('/reservations', reservationsRouter);
router.use('/reviews', reviewsRouter);

app.use("/api", router); // add the Router to the middleware handling path

// For week4 no need to look into this!
// Ensures that the client router works on reload aswell.
// Sends all requests back to index.html where the routing lib takes over
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./../../dist/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, (err) => { //start the server
  console.log(`Server listening on port ${port}`);
    if (err) {
      console.log(`${err}`);
    } else {
      console.log(`Connection successful`);
    }
}); 
