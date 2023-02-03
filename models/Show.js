import mongoose from "mongoose"

const movieSchema = new mongoose.Schema(
  {
    showTitle: {
      type: String,
      required: [true, "Please provide name"],
      trim: true,
    },
    showRating: {
      type: Number,
      required: [true, "Please provide rating"],
      min: 0,
      max: 5,
    },
    showImage: String,
    showReview: {
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
  },
  {timestamps: true}
)

export default mongoose.model("Movie", movieSchema)
