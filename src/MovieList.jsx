function MovieList({movies, deleteMovie, startEdit, editingId, title, setTitle, updateMovie}) {
    return (
        <ul>
            {movies.map((movie) => (
                <li key={movie.id}>
                    {editingId === movie.id ? (
                        <>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <button onClick={() => updateMovie(movie.id)}>save</button>
                        </>
                    ) : (
                        <>
                            {movie.title}

                            <button onClick={() => startEdit(movie)}>
                                edit
                            </button>

                            <button onClick={() => deleteMovie(movie.id)}>
                                delete
                            </button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default MovieList;