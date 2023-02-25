import {useAppContext} from "../../context/appContext"
import StatItem from "./StatItem"
import styled from "styled-components"
import {useEffect, useState} from "react"
import ChartsContainer from "./ChartsContainer"

const StatsContainer = () => {
  const {movieStats, showStats, changeChart} = useAppContext()
  const [stats, setStats] = useState([])
  const [activeButton, setActiveButton] = useState("movies")
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
      <div className="stats-container">
        {stats.map((item, index) => {
          return (
            <div className="stat-item">
              <StatItem key={index} {...item} />{" "}
            </div>
          )
        })}
      </div>
      <div className="btn-container">
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
              changeChart("movies")
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
              changeChart("shows")
            }}
          />
          <label class="btn btn-outline-secondary" for="btnradio2">
            Shows
          </label>
        </div>
      </div>
      {/* <ChartsContainer /> */}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .btn-container {
    position: relative;
    top: -0.5rem;
    left: 4rem;
    @media (min-width: 768px) {
      top: -2.5rem;
    }
    @media (min-width: 768px) {
      top: -2.5rem;
    }
  }
  .stats-container {
    margin: 2rem 4rem;
    margin-bottom: 2rem;
    row-gap: 2rem;
    width: vw;
    display: block;
    StatItem {
      margin-bottom: 2rem;
    }

    @media (min-width: 768px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;

      .btn-container {
        position: relative;
      }
    }

    @media (min-width: 1280px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

      .btn-container {
        position: relative;
      }
    }
  }
`
// const Wrapper = styled.section`
//   .btn-container {
//     position: relative;
//     top: 0;
//     right: 0;
//   }
//   .stats-container {
//     margin: 2rem 4rem;
//     margin-bottom: 2rem;
//     row-gap: 2rem;
//     width: vw;
//     @media (min-width: 768px) {
//       display: grid;
//       grid-template-columns: 1fr 1fr 1fr;
//       gap: 2rem;
//       margin-bottom: 2rem;
//       .btn-container {
//         position: relative;
//         top: 0;
//         right: 0;
//       }
//     }
//     @media (min-width: 1280px) {
//       grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
//       .btn-container {
//         position: relative;
//         top: 0;
//         right: 0;
//       }
//     }
//   }
// `

export default StatsContainer
