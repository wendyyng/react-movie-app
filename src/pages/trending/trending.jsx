import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import SingleContent from '../../components/single.content/single.content.component';
import styled from 'styled-components'
import CustomPagination from '../../components/pagination/custom.pagination.component';

export const PageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`
    );
      console.log(data)
    setContent(data.results);
  }

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page])

  return (
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
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
      ))
    }  
    <CustomPagination setPage={setPage} />
    </PageContainer>

  )
}

export default Trending