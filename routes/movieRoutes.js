import express from 'express';
const router = express.Router()


import { createMovie, updateMovie, getAllMovies, showStats, deleteMovie } from "../controllers/movieController.js";


router.route('/').post(createMovie).get(getAllMovies);
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteMovie).patch(updateMovie);

export default router

