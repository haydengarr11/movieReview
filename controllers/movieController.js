import {BadRequestError} from "../errors/index.js"
import {StatusCodes} from "http-status-codes"
import Movie from "../models/Movie.js"

const createMovie = async (req, res) => {
  const {title, rating, review, coverPhoto} = req.body

  if (!title || !rating || !review) {
    throw new BadRequestError("Please provide all values")
  }

  req.body.createdBy = req.user.userId

  const movieReview = await Movie.create(req.body)
  res.status(StatusCodes.CREATED).json({movieReview})
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
