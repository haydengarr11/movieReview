import mongoose from "mongoose"

const showSchema = new mongoose.Schema(
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
    creatorName: {
      type: String,
      required: [true, "please provide name"],
    },
  },
  {timestamps: true}
)

export default mongoose.model("Show", showSchema)
