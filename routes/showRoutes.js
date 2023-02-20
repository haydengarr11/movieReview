import express from "express"
const router = express.Router()

import {
  createShow,
  updateShows,
  getAllShows,
  deleteShow,
  getOwnShows,
  showStats,
} from "../controllers/showsController.js"

router.route("/").post(createShow).get(getAllShows)
router.route("/stats").get(showStats)
router.route("/:id").get(getOwnShows).delete(deleteShow).patch(updateShows)

export default router
