import {useEffect, useState} from "react"
import {
  FormRow,
  Alert,
  OwnMoviesContainer,
  OwnShowsContainer,
  OwnMovieSearchContainer,
  OwnShowSearchContainer,
} from "../../components"
import {useAppContext} from "../../context/appContext"
import styled from "styled-components"

const Profile = () => {
  const {
    user,
    showAlert,
    displayAlert,
    updateUser,
    isLoading,
    ownMovies,
    getOwnMovies,
    ownMovieSort,
    ownMovieSearch,
    ownMovieRatingType,
    ownShowSort,
    ownShowSearch,
    ownShowRatingType,
  } = useAppContext()

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [activeButton, setActiveButton] = useState("movies")

  const handleSubmit = (e) => {
    e.preventDefault()

    //remove while testing
    // if (!name || !email || !lastName || !location) {
    //   displayAlert();
    //   return;
    // }

    updateUser({name, lastName, email})
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait" : "Save Changes"}
          </button>
        </div>
      </form>
      {/* {ownMovies.length > 0 && <p>you have movies</p>}
      {ownMovies.length === 0 && <p>No reviews created</p>}
      <div>
        {ownMovies?.map((movie) => {
          return <Movie key={movie._id} {...movie} />
        })}
      </div> */}
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
          onClick={() => setActiveButton("movies")}
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
          onClick={() => setActiveButton("shows")}
        />
        <label class="btn btn-outline-secondary" for="btnradio2">
          Shows
        </label>
      </div>
      {activeButton === "movies" && (
        <>
          <OwnMovieSearchContainer /> <OwnMoviesContainer />
        </>
      )}
      {activeButton === "shows" && (
        <>
          {" "}
          <OwnShowSearchContainer /> <OwnShowsContainer />{" "}
        </>
      )}
    </Wrapper>
  )
}
export default Profile

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  .btn-group {
    margin-top: 2rem;
    margin-left: 2rem;
  }
  h3 {
    margin-top: -1rem;
  }
  .form {
    margin-left: 2rem;
    margin-right: 2rem;
    border-radius: 5px;
    box-shadow: none;
    padding: 2rem 2rem;
    max-width: 100%;
    width: auto;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
  @media (max-width: 767px) {
    .form-input {
      width: 90vw;
    }
    .btn-block {
      width: 90vw;
    }
    .btn-group {
      margin: 1rem 0 0 0;
    }
  }
`
