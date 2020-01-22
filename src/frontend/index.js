import "./index.css";

import SPARouter from "@kodnificent/sparouter";

import mealsId from "./pages/meal";
import homeRouter from "./pages/home";
import reviewRouter from "./pages/reviews";
import allMealsRouter from "./pages/meals";

const options = {
  historyMode: true // set this to true if you use the HTML5 history mode API
};
const router = new SPARouter(options);

router.get("/", homeRouter);
router.get("/meals", allMealsRouter);
router.get("/meals/{id}", mealsId);
router.get("/reviews", reviewRouter);

router.init();
