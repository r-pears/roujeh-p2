function MovieItem({ movie, deleteMovie, startEdit, }) {
    return (
        <li>
            {movie.title}
            
            <button onClick={() => startEdit(movie)}>
                Edit
            </button>

        <button onClick={() => deleteMovie(movie.id)}>
            Delete
        </button>
    </li>
    );
}
export default MovieItem