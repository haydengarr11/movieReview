import "express-async-errors"
import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"

//db and authenticateUser
import connectDB from "./db/connect.js"

//routers
import authRouter from "./routes/authRoutes.js"
import movieRouter from "./routes/movieRoutes.js"
import showRouter from "./routes/showRoutes.js"

//notFoundMiddleware
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"
import authenticateUser from "./middleware/auth.js"

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"))
}

app.use(express.json())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/movies", authenticateUser, movieRouter)
app.use("/api/v1/shows", authenticateUser, showRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.CONNECTION)
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
