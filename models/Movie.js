import mongoose, {mongo} from "mongoose"

const movieSchema = new mongoose.Schema(
  {
    movieTitle: {
      type: String,
      required: [true, "Please provide name"],
      trim: true,
    },
    movieRating: {
      type: Number,
      required: [true, "Please provide rating"],
      min: 0,
      max: 5,
    },
    movieImage: String,
    movieReview: {
      type: String,
      required: [true, "Please provide review description"],
      minlength: 0,
      maxlength: 500,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    creatorName: {
      type: String,
      required: [true, "provide name"],
    },
  },
  {timestamps: true}
)

export default mongoose.model("Movie", movieSchema)
