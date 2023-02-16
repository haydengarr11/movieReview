import {BadRequestError, NotFoundError} from "../errors/index.js"
import {StatusCodes} from "http-status-codes"
import Movie from "../models/Movie.js"
import User from "../models/User.js"

const createMovie = async (req, res) => {
  const {movieTitle, movieRating, movieReview, movieImage} = req.body

  if (!movieRating || !movieReview) {
    throw new BadRequestError("Please provide all values")
  }

  req.body.createdBy = req.user.userId
  const user = await User.findById(req.body.createdBy)
  req.body.creatorName = `${user.name} ${user.lastName}`

  const review = await Movie.create(req.body)
  res.status(StatusCodes.CREATED).json({review})
}

const getAllMovies = async (req, res) => {
  const movies = await Movie.find()

  res
    .status(StatusCodes.OK)
    .json({movies, totalMovies: movies.length, numOfPages: 1})
}
const updateMovie = async (req, res) => {
  const {id: movieId} = req.params

  const {movieTitle, movieRating, movieReview} = req.body

  if (!movieRating || !movieReview) {
    throw new BadRequestError("Please provide all values")
  }

  const movie = await Movie.findOne({_id: movieId})

  if (!movie) {
    throw new NotFoundError(`No Movie Review with id ${movieId}`)
  }

  const updatedMovie = await Movie.findOneAndUpdate({_id: movieId}, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({updatedMovie})
}

const deleteMovie = (req, res) => {
  res.send("delete movie")
}

const getOwnMovies = async (req, res) => {
  const ownMovies = await Movie.find({createdBy: req.user.userId})

  res
    .status(StatusCodes.OK)
    .json({ownMovies, totalOwnMovies: ownMovies.length, numOfPages: 1})
}

const showStats = (req, res) => {
  res.send("show stats movie")
}

export {
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  showStats,
  getOwnMovies,
}
