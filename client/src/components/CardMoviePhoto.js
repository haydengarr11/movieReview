import axios from "axios"
import {useState} from "react"

const CardMoviePhoto = ({movie}) => {
  const image = "https://image.tmdb.org/t/p/original"
  console.log(`${image}${movie.poster_path}`)

  return (
    <img
      src={`${image}${movie.poster_path}`}
      alt={movie.title}
      className="card-img-top mx-auto d-flex"
    />
  )
}

export default CardMoviePhoto
