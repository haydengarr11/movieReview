import {BadRequestError, NotFoundError} from "../errors/index.js"
import {StatusCodes} from "http-status-codes"
import Movie from "../models/Movie.js"
import User from "../models/User.js"
import checkPermissions from "../utils/checkPermission.js"
import mongoose from "mongoose"
import moment from "moment"

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

  checkPermissions(req.user, movie.createdBy)

  const updatedMovie = await Movie.findOneAndUpdate({_id: movieId}, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({updatedMovie})
}

const deleteMovie = async (req, res) => {
  const {id: movieId} = req.params
  const movie = await Movie.findOne({_id: movieId})

  if (!movie) {
    throw new CustomAPIError.NotFoundError(`No Movie with id : ${movieId}`)
  }

  checkPermissions(req.user, movie.createdBy)

  await movie.remove()
  res.status(StatusCodes.OK).json({msg: "Success! Movie removed"})
}

const getOwnMovies = async (req, res) => {
  const ownMovies = await Movie.find({createdBy: req.user.userId})

  res
    .status(StatusCodes.OK)
    .json({ownMovies, totalOwnMovies: ownMovies.length, numOfPages: 1})
}

const showStats = async (req, res) => {
  let stats = await Movie.aggregate([
    {$match: {createdBy: mongoose.Types.ObjectId(req.user.userId)}},
    {$group: {_id: "$movieRating", count: {$sum: 1}}},
  ])

  stats = stats.reduce((acc, curr) => {
    const {_id: rating, count} = curr
    acc[rating.toString()] = count
    return acc
  }, {})

  const defaultStats = {
    one: stats[1] || 0,
    two: stats[2] || 0,
    three: stats[3] || 0,
    four: stats[4] || 0,
    five: stats[5] || 0,
  }
  let monthlyMovies = await Movie.aggregate([
    {$match: {createdBy: mongoose.Types.ObjectId(req.user.userId)}},
    {
      $group: {
        _id: {year: {$year: "$createdAt"}, month: {$month: "$createdAt"}},
        count: {$sum: 1},
      },
    },
    {
      $sort: {"_id.year": -1, "_id.month": -1},
    },
    {$limit: 6},
  ])

  monthlyMovies = monthlyMovies
    .map((item) => {
      const {
        _id: {year, month},
        count,
      } = item
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y")
      return {date, count}
    })
    .reverse()

  res.status(StatusCodes.OK).json({defaultStats, monthlyMovies})
}

export {
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  showStats,
  getOwnMovies,
}
