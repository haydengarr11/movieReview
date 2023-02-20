import {useAppContext} from "../../context/appContext"
import StatItem from "./StatItem"
import styled from "styled-components"
import {useEffect, useState} from "react"

const StatsContainer = () => {
  const {movieStats, showStats} = useAppContext()
  const [stats, setStats] = useState([])
  const [activeButton, setActiveButton] = useState("movies")
  // defaultStats.sort((a, b) => {
  //   return b.stars - a.stars
  // })
  useEffect(() => {
    setStats([
      {
        stars: "1",
        count: movieStats.one,
        color: "#b20000",
      },
      {
        stars: "2",
        count: movieStats.two,
        color: "#ff9999",
      },
      {
        stars: "3",
        count: movieStats.three,
        color: "#ffc04c",
      },
      {
        stars: "4",
        count: movieStats.four,
        color: "#99cc99",
      },
      {
        stars: "5",
        count: movieStats.five,
        color: "#4ca64c",
      },
    ])
  }, [movieStats])
  return (
    <Wrapper>
      {stats.map((item, index) => {
        return <StatItem key={index} {...item} />
      })}
      <div
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          autocomplete="off"
          checked={activeButton === "movies"}
          onClick={() => {
            setStats([
              {
                stars: "1",
                count: movieStats.one,
                color: "#b20000",
              },
              {
                stars: "2",
                count: movieStats.two,
                color: "#ff9999",
              },
              {
                stars: "3",
                count: movieStats.three,
                color: "#ffc04c",
              },
              {
                stars: "4",
                count: movieStats.four,
                color: "#99cc99",
              },
              {
                stars: "5",
                count: movieStats.five,
                color: "#4ca64c",
              },
            ])
            setActiveButton("movies")
          }}
        />
        <label class="btn btn-outline-secondary" for="btnradio1">
          Movies
        </label>
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio2"
          autocomplete="off"
          checked={activeButton === "shows"}
          onClick={() => {
            setStats([
              {
                stars: "1",
                count: showStats.one,
                color: "#b20000",
              },
              {
                stars: "2",
                count: showStats.two,
                color: "#ff9999",
              },
              {
                stars: "3",
                count: showStats.three,
                color: "#ffc04c",
              },
              {
                stars: "4",
                count: showStats.four,
                color: "#99cc99",
              },
              {
                stars: "5",
                count: showStats.five,
                color: "#4ca64c",
              },
            ])
            setActiveButton("shows")
          }}
        />
        <label class="btn btn-outline-secondary" for="btnradio2">
          Shows
        </label>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: block;
  row-gap: 2rem;
  margin: 2rem 4rem;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    max-width: min-content;
    gap: 2rem;
  }

  @media (min-width: 1120px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
`

export default StatsContainer
