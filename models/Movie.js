import mongoose from "mongoose"

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Please provide rating"],
      min: 0,
      max: 10,
    },
    image: String,
    review: {
      type: String,
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
