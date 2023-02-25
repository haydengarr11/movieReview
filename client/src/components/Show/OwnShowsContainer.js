import {useEffect} from "react"
import {useAppContext} from "../../context/appContext"
import styled from "styled-components"
import Show from "./Show"

const OwnShowsContainer = () => {
  const {getOwnShows, isLoading, totalOwnShows, page, ownShows, showAlert} =
    useAppContext()
  useEffect(() => {
    getOwnShows()
  }, [])
  ownShows.forEach((element) => {
    element.createdAt = new Date(element.createdAt)
  })

  ownShows.sort((a, b) => {
    return b.createdAt - a.createdAt
  })

  if (isLoading) {
    // return <Loading />
  }
  if (ownShows.length === 0) {
    return (
      <Wrapper>
        <h2> No movies to show...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalOwnShows} show{ownShows.length > 1 && "s"} found
      </h5>
      <div className="shows">
        {ownShows.map((show) => {
          return <Show key={show._id} {...show} />
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 4rem;
  margin-left: 2rem;
  margin-right: 2rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .shows {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 900px) {
    .shows {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
  @media (min-width: 1330px) {
    .shows {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
    @media (min-width: 1700px) {
      .movies {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 0.5rem;
      }
    }
  }
`

export default OwnShowsContainer
