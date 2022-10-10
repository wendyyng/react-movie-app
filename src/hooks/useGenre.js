export const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";

    const GenreIds = selectedGenres.map((genre) => genre.id)
    return GenreIds.reduce((acc, curr) => acc + "," + curr.id)

}