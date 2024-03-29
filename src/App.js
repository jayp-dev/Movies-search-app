import { useEffect, useRef, useState } from "react";
import StarRating from "./StartRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "304e15da";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("border");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [Err, setErr] = useState(false);
  const [selectedid, setSelectedId] = useState(null);
  useEffect(
    function () {
      async function FetchMoviews() {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          const data = await res.json();
          // console.log(data);
          if (data.Response === "False") throw new Error("Moview Not Found ");
          setMovies(data.Search);
          setErr(false);
        } catch (error) {
          // console.log(error.message);
          setErr(error.message);
        }
      }
      FetchMoviews();
    },
    [query]
  );

  return (
    <>
      <Navbar movies={movies}>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumbResults movies={movies} />
      </Navbar>
      <Main>
        <Box
          element={
            <MovieList
              movies={movies}
              Err={Err}
              setSelectedId={setSelectedId}
            />
          }
        />
        <Box
          element={
            <>
              {selectedid ? (
                <MoviesDetail
                  selectedid={selectedid}
                  setSelectedId={setSelectedId}
                />
              ) : (
                <>
                  <WatchedSummary watched={watched} />
                  <WatchedList watched={watched} />
                </>
              )}
            </>
          }
        />
      </Main>
    </>
  );
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  const refElement = useRef(null);
  useEffect(() => {
    function callback(e) {
      if (document.activeElement === refElement.current) return;
      if (e.code === "Enter") {
        refElement.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callback);

    return () => document.addEventListener("keydown", callback);
  }, [setQuery]);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={refElement}
    />
  );
}

function NumbResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}
function Box({ element }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle">{isOpen ? "–" : "+"}</button>
      {isOpen && element}
    </div>
  );
}

function MovieList({ movies, Err, setSelectedId }) {
  // console.log(Err);
  if (Err) {
    return (
      <>
        <ul className="list">
          <li>
            <span>{Err}</span>
          </li>
        </ul>
      </>
    );
  }
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} setSelectedId={setSelectedId} />
      ))}
    </ul>
  );
}
function Movie({ movie, setSelectedId }) {
  return (
    <li onClick={() => setSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function MoviesDetail({ selectedid, setSelectedId }) {
  const [movie, setMovies] = useState({});
  const {
    Title: title,
    // Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating: ImdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  useEffect(() => {
    const GetMoview = async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedid}`
      );
      const data = await res.json();
      setMovies(data);
    };

    GetMoview();
  }, [selectedid]);
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => setSelectedId(null)}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title} Moview`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {ImdbRating} IMDB Rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating
            maxrating={10}
            messages={["bad", "poor", "amazing", "excellent", "awesome"]}
            size="20"
          />
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed By {director}</p>
      </section>
    </div>
  );
}
function WatchedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
