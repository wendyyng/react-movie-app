import axios from 'axios'
import React from 'react'
import { PageContainer } from '../trending/trending'
import { useState, useEffect } from 'react'
import SingleContent from '../../components/single.content/single.content.component'
import CustomPagination from '../../components/pagination/custom.pagination.component'
import Genres from '../../components/genres/genres.component'
import { useGenre } from '../../hooks/useGenre'
import styled from 'styled-components'

const Movies = () => {
 
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([])
  const [page, setPage] = useState(1);
  const [numOfPages, setNumofPages] = useState();
  const [content, setContent] = useState([])
  const genreforURL = useGenre(selectedGenres)


  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    )
    console.log(data.results)
    setContent(data.results);
    setNumofPages(data.total_pages);
  }

  useEffect(() => {
    fetchMovies();
  }, [genreforURL, page])

  return (
    <div className='page'>
      <span className="pageTitle">Discover Movies</span>
      <Genres 
      selectedGenres={selectedGenres} 
      setSelectedGenres={setSelectedGenres}
      genres={genres}
      setGenres={setGenres}
      setPage={setPage}
      type="movie"

      />
    <PageContainer>
    {
      content && 
      content.map((c) => (
        <SingleContent
          key={c.id}
          id={c.id}
          poster={c.poster_path}
          title={c.title || c.name}
          date={c.first_air_date || c.release_date}
          media_type="movie"
          vote_average={c.vote_average}
            />
      ))
    }  
    </PageContainer>
        {
      numOfPages > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages}/>)
    }
    </div>
  )
}

export default Movies