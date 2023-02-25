import {BadRequestError} from "../errors/index.js"
import {StatusCodes} from "http-status-codes"
import Show from "../models/Show.js"
import User from "../models/User.js"
import checkPermissions from "../utils/checkPermission.js"
import mongoose from "mongoose"
import moment from "moment"
const createShow = async (req, res) => {
  const {showTitle, showRating, showReview, showImage} = req.body

  if (!showRating || !showReview) {
    throw new BadRequestError("Please provide all values")
  }

  req.body.createdBy = req.user.userId
  const user = await User.findById(req.body.createdBy)
  req.body.creatorName = `${user.name} ${user.lastName}`

  const review = await Show.create(req.body)
  res.status(StatusCodes.CREATED).json({review})
}

const getAllShows = async (req, res) => {
  const shows = await Show.find()

  res
    .status(StatusCodes.OK)
    .json({shows, totalShows: shows.length, numOfPages: 1})
}
const updateShows = async (req, res) => {
  const {id: showId} = req.params

  const {showTitle, showRating, showReview} = req.body

  if (!showRating || !showReview) {
    throw new BadRequestError("Please provide all values")
  }

  const show = await Show.findOne({_id: showId})

  if (!show) {
    throw new NotFoundError(`No Show Review with id ${showId}`)
  }

  checkPermissions(req.user, show.createdBy)

  const updatedShow = await Show.findOneAndUpdate({_id: showId}, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({updatedShow})
}

const deleteShow = async (req, res) => {
  const {id: showId} = req.params
  const show = await Show.findOne({_id: showId})

  if (!show) {
    throw new CustomAPIError.NotFoundError(`No Show with id : ${showId}`)
  }

  checkPermissions(req.user, show.createdBy)

  await show.remove()
  res.status(StatusCodes.OK).json({msg: "Success! Show removed"})
}
const getOwnShows = async (req, res) => {
  const ownShows = await Show.find({createdBy: req.user.userId})

  res
    .status(StatusCodes.OK)
    .json({ownShows, totalShows: ownShows.length, numOfPages: 1})
}
const showStats = async (req, res) => {
  let stats = await Show.aggregate([
    {$match: {createdBy: mongoose.Types.ObjectId(req.user.userId)}},
    {$group: {_id: "$showRating", count: {$sum: 1}}},
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
  let monthlyShows = await Show.aggregate([
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

  monthlyShows = monthlyShows
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
  res.status(StatusCodes.OK).json({defaultStats, monthlyShows})
}

export {
  createShow,
  getAllShows,
  updateShows,
  deleteShow,
  getOwnShows,
  showStats,
}
