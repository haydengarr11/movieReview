import {BadRequestError} from "../errors/index.js"
import {StatusCodes} from "http-status-codes"
import Movie from "../models/Movie.js"

const createMovie = async (req, res) => {
  const {movieTitle, movieRating, movieReview, movieImage} = req.body

  if (!movieRating || !movieReview) {
    throw new BadRequestError("Please provide all values")
  }

  req.body.createdBy = req.user.userId

  const review = await Movie.create(req.body)
  res.status(StatusCodes.CREATED).json({review})
}

const getAllMovies = async (req, res) => {
  res.send("get all movies")
}
const updateMovie = async (req, res) => {
  res.send("update movie")
}

const deleteMovie = (req, res) => {
  res.send("delete movie")
}

const showStats = (req, res) => {
  res.send("show state movie")
}

export {createMovie, getAllMovies, updateMovie, deleteMovie, showStats}
