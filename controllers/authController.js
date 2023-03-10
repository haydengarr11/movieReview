import User from "../models/User.js"
import {StatusCodes} from "http-status-codes"
import {BadRequestError, UnauthenticatedError} from "../errors/index.js"
import Movie from "../models/Movie.js"
import Show from "../models/Show.js"

const register = async (req, res, next) => {
  const {name, email, password} = req.body

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values")
  }
  const userAlreadyExists = await User.findOne({email})

  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use")
  }

  const user = await User.create({name, email, password})
  console.log(user)
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  })
}

const login = async (req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    throw new BadRequestError("Please provide all values")
  }
  const user = await User.findOne({email}).select("+password") //specified that the password isnt selected upon return so we must override and specifically ask for it to compare against the hash

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials")
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError()
  }

  const token = user.createJWT()
  user.password = undefined //must take password away from the user so then it isnt accessible on the page
  res.status(StatusCodes.OK).json({user, token, location: user.location})
}

const updateUser = async (req, res) => {
  const {email, name, lastName, location} = req.body
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values")
  }

  const user = await User.findOne({_id: req.user.userId})

  user.email = email
  user.name = name
  user.location = location
  user.lastName = lastName

  await user.save()

  const updateMovieName = await Movie.find({createdBy: req.user.userId})
  updateMovieName.forEach((movie) => {
    movie.creatorName = `${name} ${lastName}`
    movie.save()
  })
  const updateShowName = await Show.find({createdBy: req.user.userId})
  updateShowName.forEach((show) => {
    show.creatorName = `${name} ${lastName}`
    show.save()
  })

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({user, token, location: user.location})
}

export {register, login, updateUser}
