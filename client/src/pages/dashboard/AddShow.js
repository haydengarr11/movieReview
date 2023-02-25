import {FormRow, ShowCard, ShowReview} from "../../components"
import {useAppContext} from "../../context/appContext"
import {useEffect, useState} from "react"
import axios from "axios"
import styled from "styled-components"

const AddShow = () => {
  const [show, changeShow] = useState("")
  const [showsArray, changeShowsArray] = useState([])
  const {showTitle} = useAppContext()

  useEffect(() => {
    changeShowsArray([])
  }, [show, showTitle])

  const handleSubmit = (e) => {
    e.preventDefault()
    searchShow(show)
  }

  const searchShow = async (show) => {
    axios({
      method: "get",
      url: process.env.REACT_APP_SHOW_KEY,
      params: {
        query: show,
      },
    })
      .then((res) => {
        const resultsArr = res.data.results
        console.log(resultsArr)
        changeShowsArray(resultsArr)
      })
      .catch((err) => console.log(err))
  }

  if (showTitle === "") {
    return (
      <Wrapper>
        <div className="bck-img">
          <form className="form" onSubmit={handleSubmit}>
            <FormRow
              type="text"
              name="Search Show"
              value={show}
              handleChange={(e) => changeShow(e.target.value)}
            />
            <button type="submit" className="btn btn-block">
              Search
            </button>
          </form>
          <div className="container-fluid">
            <div className="row">
              {showsArray.map((show, key) => {
                return <ShowCard show={show} id={key} />
              })}
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }

  if (showTitle !== "") {
    return (
      <Wrapper>
        <ShowReview />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <FormRow
            type="text"
            name="search"
            value={show}
            handleChange={(e) => changeShow(e.target.value)}
          />
          <button type="submit" className="btn btn-block">
            Search
          </button>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .row {
    justify-content: center;
    margin: 30px 20px;
  }
  .btn-block {
    margin-top: 10px;
  }
  .card-img-top {
    border-radius: 4px 4px 10px 10px;
  }
  .btn-primary {
    margin: 0 10px 10px 10px;
  }

  .card {
    margin-bottom: 10px;
  }
  /* .card-body {
    overflow: auto;
  } */
  .container-fluid {
    background-image: url(https://c4.wallpaperflare.com/wallpaper/971/1011/721/blue-pastel-wallpaper-preview.jpg);
    background-size: cover;
    background-repeat: repeat;
    width: 100%;
  }

  .primary-back .bck-color {
    background-color: var(--primary-300);
  }
  .sec-back .bck-color {
    background-color: var(--gray-100);
  }

  .cardContainer {
    margin-bottom: 2rem;
  }
  .movie-form {
    z-index: 500;
    width: 50vw;
  }
`
export default AddShow
