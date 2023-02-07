import {BadRequestError} from "../errors/index.js"
import {StatusCodes} from "http-status-codes"
import Show from "../models/Show.js"
import User from "../models/User.js"

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
const updateShows = (req, res) => {
  res.send("update show")
}

const deleteShow = (req, res) => {
  res.send("delete show")
}
const getOwnShows = async (req, res) => {
  const ownShows = await Show.find({createdBy: req.user.userId})

  res
    .status(StatusCodes.OK)
    .json({ownShows, totalShows: ownShows.length, numOfPages: 1})
}

export {createShow, getAllShows, updateShows, deleteShow, getOwnShows}
