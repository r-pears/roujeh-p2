// REVIEW: Good using a real <form> with onSubmit + e.preventDefault() means Enter-to-submit works for free. That's better than wiring an onClick on the button.
// REVIEW: Accessibility the input has no <label>. Screen readers announce the placeholder inconsistently. Add a visually-hidden or visible label, e.g.
//     <label htmlFor="movie-title">Movie title</label>
//     <input id="movie-title" ... />
// REVIEW: Consider adding `required` (and/or `minLength={1}`) to the input so the browser enforces the same check you do in `addMovie`. That's a free layer of validation and gives the user inline feedback.
function MovieForm({ title, setTitle, onSubmit, isEditing }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        placeholder="Enter movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* REVIEW: Stray space `type ="submit"` should be `type="submit"`. JSX accepts it but it's non-standard. */}
      <button type="submit">{isEditing ? "Update Movie" : "Add Movie"}</button>
    </form>
  );
}
export default MovieForm;
