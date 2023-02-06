import express from "express"
const router = express.Router()

import {
  createMovie,
  updateMovie,
  getAllMovies,
  showStats,
  deleteMovie,
  getOwnMovies,
} from "../controllers/movieController.js"

router.route("/").post(createMovie).get(getAllMovies)
router.route("/stats").get(showStats)
router.route("/:id").get(getOwnMovies).delete(deleteMovie).patch(updateMovie)

export default router
