import {Landing, Register, Error, ProtectedRoute} from "./pages";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {
  AddMovie,
  Stats,
  AllMovies,
  AddShow,
  AllShows,
  Profile,
  SharedLayout,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-movies" element={<AllMovies />} />
          <Route path="add-movie" element={<AddMovie />} />
          <Route path="all-shows" element={<AllShows />} />
          <Route path="add-show" element={<AddShow />} />

          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
