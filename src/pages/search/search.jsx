import React, { useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { Button } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import { useState } from 'react';
import SingleContent from '../../components/single.content/single.content.component'
import CustomPagination from '../../components/pagination/custom.pagination.component'
import { PageContainer } from '../trending/trending'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select'; 

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
          main: '#e0e0e0'
        }
    }
})

const SearchBar = styled.div`
    display: flex;
    justify-content: center;
    margin: 15px 0;
`

const Search = () => {

  const [searchText, setSearchText] = useState(" ");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumofPages] = useState();
  const [result, setResult] = useState("");
  const [type, setType] = useState("movie");
  const [singleType, setSingleType] = useState("")
  // const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const fetchSearch = async () => {
    setSingleType(type)
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type === "movie" ? "movie" : "tv"}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      )
      if(data.results.length === 0){
        setResult("No Results Found.")
        setContent([])
        setNumofPages()
      }else{
        setResult("")
        setContent(data.results)
        setNumofPages(data.total_pages);
      }
      console.log(data.results)
    } catch (error){
      console.log(searchText)
      console.error(error);
    } 
  }

  useEffect(() => {

     window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [page])

  return (
    <div className='page'>
      <ThemeProvider theme={darkTheme}>
           <span className="pageTitle">Search for Movies or TV Series</span>
        <SearchBar>
           <TextField id="outlined-basic" label="Search by Title" variant="outlined" onChange={(e) => setSearchText(e.target.value)}/>
           <FormControl>
        <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChange}
          sx={{ ml: 2, width: 200}}
          MenuProps={{ style: { maxWidth: 0, maxHeight: 300, position: 'absolute', }, disableScrollLock: true, }}
        >
          <MenuItem value="movie">Movies</MenuItem>
          <MenuItem value="tv">TV Series</MenuItem>
        </Select>
      </FormControl>
            <Button
            onClick={searchText.length >= 3 ? fetchSearch : "" }
            variant="contained"
            style={{ marginLeft: 10 }}
            
          >
            <SearchIcon fontSize="large"/>
          </Button>
        </SearchBar>
      </ThemeProvider>
      <PageContainer>
        {
      content.length > 0 ? 
      content.map((c) => (
        <SingleContent
          key={c.id}
          id={c.id}
          poster={c.poster_path}
          title={c.title || c.name}
          date={c.first_air_date || c.release_date}
          media_type={singleType === "movie" ? "movie" : "tv"}
          vote_average={c.vote_average}
            />
      )) 
      :
      <div>{result}</div>
    }  
      </PageContainer>
    {
      numOfPages > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages}/>)
    }
    </div>
  )
}

export default Search