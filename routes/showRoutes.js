import express from "express";
import {showStats} from "../controllers/movieController.js";
const router = express.Router();

import {
  createShow,
  updateShows,
  getAllShows,
  deleteShow,
} from "../controllers/showsController.js";

router.route("/").post(createShow).get(getAllShows);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteShow).patch(updateShows);

export default router;
