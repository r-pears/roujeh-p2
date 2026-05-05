// REVIEW: Trailing comma after `startEdit,` in the destructuring is harmless but inconsistent usually clean it up unless the project's formatter enforces it.
// REVIEW: You defined a `.btn` class in App.css but never apply it here. Add `className="btn"` to both buttons (and import App.css in App.jsx) so they actually get styled.
// REVIEW: Accessibility the buttons just say "Edit" / "Delete". A screen-reader user hearing a list of these has no idea which movie each refers to. Consider `aria-label={`Edit ${movie.title}`}` and the same for delete.
// REVIEW: Indentation drifts inside the <li> the second `<button>` sits at a shallower indent than the first. Tidy it up so the JSX tree is easy to read.
function MovieItem({ movie, deleteMovie, startEdit }) {
  return (
    <li>
      {movie.title}

      <button onClick={() => startEdit(movie)}>Edit</button>

      <button onClick={() => deleteMovie(movie.id)}>Delete</button>
    </li>
  );
}
export default MovieItem;
