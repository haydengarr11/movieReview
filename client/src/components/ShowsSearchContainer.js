import {FormRow, FormRowSelect} from "."
import {useAppContext} from "../context/appContext"
import styled from "styled-components"

const ShowsSearchContainer = () => {
  const {
    isLoading,
    showSearch,
    showSortOptions,
    showRatingOptions,
    showSort,
    showRatingType,
    handleMovieChange,
    clearShowFilters,
  } = useAppContext()
  const handleSearch = (e) => {
    if (isLoading) return
    handleMovieChange({name: e.target.name, value: e.target.value})
  }
  const handleSubmit = () => {
    clearShowFilters()
  }
  return (
    <Wrapper>
      <h4>Search Form</h4>
      <div className="form-center">
        <FormRow
          type="text"
          name="showSearch"
          labelText="Search"
          value={showSearch}
          handleChange={handleSearch}
        />
        <FormRowSelect
          labelText="Rating"
          name="showRatingType"
          value={showRatingType}
          handleChange={handleSearch}
          list={showRatingOptions}
        />
        <FormRowSelect
          labelText="Sort"
          name="showSort"
          value={showSort}
          handleChange={handleSearch}
          list={showSortOptions}
        />
        <button
          className="btn btn-block btn-danger"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Clear Filters
        </button>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  background-color: white;
  margin: 2rem;
  padding: 1rem;
  border-radius: 5px;
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`

export default ShowsSearchContainer
