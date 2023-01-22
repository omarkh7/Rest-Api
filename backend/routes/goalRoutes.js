const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  UpdateGoals,
  deleteGoals,
} = require("../controller/goalController");

router.route("/").get(getGoals).post(setGoals);
router.route("/:id").put(UpdateGoals).delete(deleteGoals);

module.exports = router;
