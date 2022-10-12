import axios from 'axios'
import React, { useEffect } from 'react'
import { Chip } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#424242',
    },
    secondary: {
      main: '#e0e0e0',
    },
  }})

const Genres = (
  {
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}
) => {

    const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };
  
 //list of genres: https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US
 const fetchGenres = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US
    `);
    console.log(data.genres)
    setGenres(data.genres);
    console.log(genres)
  }

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({}); //unmounting
    }
    // eslint-disable-next-line
  }, [])

  return (
    <ThemeProvider theme={theme}>
    <div style={{ padding: "10px", margin: "5px"}}>
      {selectedGenres.length > 0 && selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="secondary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.length > 0 && genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
          // variant="filled"
          color="primary"
        />
      ))}
    </div>
    </ThemeProvider>
  )
}

export default Genres