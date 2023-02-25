import {useAppContext} from "../../context/appContext"
import styled from "styled-components"
import BarCharts from "../Charts/BarCharts.js"
import AreaCharts from "../Charts/AreaCharts"
import {useState} from "react"

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true)
  const {monthlyMovies, monthlyShows, changeChart, statsMovies} =
    useAppContext()
  return (
    <Wrapper>
      <div className="container-fluid chart-container">
        <h4>Monthly {statsMovies}</h4>
        <button type="button" onClick={() => setBarChart(!barChart)}>
          {barChart ? "Area Chart" : "Bar Chart"}
        </button>
        {barChart ? (
          <BarCharts
            data={statsMovies === "movies" ? monthlyMovies : monthlyShows}
          />
        ) : (
          <AreaCharts
            data={statsMovies === "movies" ? monthlyMovies : monthlyShows}
          />
        )}
      </div>
    </Wrapper>
  )
}
export default ChartsContainer

const Wrapper = styled.section`
  margin-top: 2rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
  .chart-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
