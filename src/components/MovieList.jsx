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
export default MovieList