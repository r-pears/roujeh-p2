function MovieForm({ title, setTitle, onSubmit, isEditing }) {
    return (
        <form
        onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
        }}
    >
        <input
            type="text"
            placeholder="Enter movie title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />

        <button type ="submit">
            {isEditing ? "Update Movie" : "Add Movie"}
        </button>
    </form>
    );
}
export default MovieForm