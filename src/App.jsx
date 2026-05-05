// REVIEW: Small style nit the trailing comma after `useEffect,` is unnecessary. Clean: `import { useState, useEffect } from "react"`.
// REVIEW: `App.css` is never imported anywhere, so the `.app-container` and `.btn` classes you defined have no effect. Either import it here (`import "./App.css"`) and use the classes, or delete the file.
import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";

function App() {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // REVIEW: Nice use of the functional setter to avoid clobbering existing data and that's a good instinct.
    // REVIEW: A few things worth tightening here:
    //   1) No `.catch(...)` if the network fails the promise rejects silently add a `.catch` to log/handle the error.
    //   2) JSONPlaceholder returns `posts`, not movies. Naming the variable `formatted` and treating posts as movies is a bit misleading; consider a comment noting it's just placeholder seed data.
    //   3) You could short-circuit before the fetch: read `movies.length` first and skip the network call entirely if seed data isn't needed. That avoids a wasted request on every load after the first.
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          id: item.id,
          title: item.title,
        }));

        setMovies((prev) => {
          if (prev.length === 0) {
            return formatted;
          }
          return prev;
        });
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const addMovie = () => {
    // REVIEW: Style add a space before the arrow: `const addMovie = () => {`. Helps readability and matches your other handlers.
    // REVIEW: `Date.now()` for IDs is fine for a learning project, but two rapid clicks can produce duplicate IDs. For something more robust, `crypto.randomUUID()` is built into modern browsers and guaranteed unique.
    if (title.trim() === "") return;

    setMovies([...movies, { id: Date.now(), title }]);
    setTitle("");
  };
  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };
  const startEdit = (movie) => {
    setTitle(movie.title);
    setEditingId(movie.id);
  };
  const updateMovie = (id) => {
    setMovies(
      movies.map((movie) => (movie.id === id ? { ...movie, title } : movie)),
    );
    setEditingId(null);
    setTitle("");
  };
  const handleSubmit = () => {
    // REVIEW: Subtle bug `if (editingId)` is falsy when `editingId === 0`. JSONPlaceholder happens to start IDs at 1, but if a movie ever has id `0` (or you change ID generation), edit mode breaks. Use `if (editingId !== null)` to match the explicit `null` you set elsewhere.
    if (editingId) {
      updateMovie(editingId);
    } else {
      addMovie();
    }
  };

  return (
    // REVIEW: You already have `.app-container` defined in App.css doing exactly this. Prefer the class over inline styles it keeps presentation in CSS and JSX clean: `<div className="app-container">`.
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial",
      }}
    >
      <h1>My Movie App</h1>
      <MovieForm
        title={title}
        setTitle={setTitle}
        onSubmit={handleSubmit}
        isEditing={editingId !== null}
      />

      <p>Number of movies: {movies.length}</p>
      {/* REVIEW: Tiny nit — double space in `=== 0  &&`. */}
      {movies.length === 0 && <p>No movies yet </p>}

      {/* REVIEW: Indentation got lost on this block — the `<MovieList>` and its props sit at column 0 while the rest of the JSX is indented. Run Prettier or fix it manually so the structure reads at a glance. */}
      <MovieList
        movies={movies}
        deleteMovie={deleteMovie}
        startEdit={startEdit}
      />
    </div>
  );
}

export default App;
