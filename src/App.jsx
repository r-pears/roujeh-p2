import { useState, useEffect,} from "react"
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";

function App() {

  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [title, setTitle] = useState("")
  const [editingId, setEditingId] = useState(null)

   useEffect(() => {
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

  const addMovie =() => {
    if (title.trim() === "") return

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
  const handleSubmit = () => {  
    if (editingId) {
      updateMovie(editingId)
    } else {
      addMovie();
    }
  };
  
    return (
    <div style={{
      textAlign: "center",
      marginTop: "50px",
      fontFamily: "Arial"
    }}>
      <h1>My Movie App</h1>
      <MovieForm
        title={title}
        setTitle={setTitle}
        onSubmit={handleSubmit}
        isEditing={editingId !== null}
      />

      <p>Number of movies: {movies.length}</p>
    {movies.length === 0  && <p>No movies yet </p>}

<MovieList
movies={movies}
deleteMovie={deleteMovie}
startEdit={startEdit}
/>
    </div>
  );
}

export default App
