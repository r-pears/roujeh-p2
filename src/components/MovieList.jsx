// REVIEW: Nice clean component single responsibility (rendering the list), props passed through, `key={movie.id}` correctly placed on the iterated element. This is the pattern to keep doing.
// REVIEW: Minor the empty-list message ("No movies yet") lives in App.jsx. Often it reads more naturally inside MovieList itself, since the list component "owns" the rendering of zero/many items. Not required, just a thought for the next iteration.
import MovieItem from "./MovieItem";

function MovieList({ movies, deleteMovie, startEdit }) {
  return (
    <ul>
      {movies.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          deleteMovie={deleteMovie}
          startEdit={startEdit}
        />
      ))}
    </ul>
  );
}
export default MovieList;
