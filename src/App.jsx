import { useState } from "react"
import MovieList from "./MovieList";

function App() {

  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState("")
  const [editingId, setEditingId] = useState(null)
  const addMovie =() => {
    if (title === "") return

    setMovies([...movies, { id: Date.now(), title }])
    setTitle("")

  }
  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id))
  }
  const startEdit = (movie) => {
    setTitle(movie.title)
    setEditingId(movie.id)
  }
  const updateMovie = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, title } : movie
      )    
    )
    setEditingId(null)
    setTitle("")
  }
  
    return (
    <div style={{
      textAlign: "center",
      marginTop: "50px",
      fontFamily: "Arial"
    }}>
      <h1>My Movie App</h1>
      <input 
        type="text"
        placeholder="Enter movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "6px", marginRight: "10px" }}

      />
      <button 
      onClick={addMovie}
      style={{ padding: "6px 12px", cursor: "pointer" }}
        >
          Add Movie
      </button>

      <p>Number of movies: {movies.length}</p>
    {movies.length === 0  && <p>No movies yet </p>}

<MovieList
movies={movies}
deleteMovie={deleteMovie}
startEdit={startEdit}
editingId={editingId}
title={title}
setTitle={setTitle}
updateMovie={updateMovie}
/>
    </div>
  );
}

export default App
