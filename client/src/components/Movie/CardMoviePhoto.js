import axios from "axios"
import {useState} from "react"

const CardMoviePhoto = ({item}) => {
  const image = "https://image.tmdb.org/t/p/original"
  console.log(`${image}${item.poster_path}`)

  return (
    <img
      src={`${image}${item.poster_path}`}
      alt={item.title}
      className="card-img-top mx-auto d-flex"
    />
  )
}

export default CardMoviePhoto
