import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import styled from 'styled-components';

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
})

const PaginationConatiner = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1em;
`
const CustomPagination = ({setPage, numOfPages}) => {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    }

  return (
    <PaginationConatiner>
        <ThemeProvider theme={darkTheme}>
            <Stack spacing={2}>
                <Pagination 
                onChange={(e) => handlePageChange(e.target.textContent)}
                count={numOfPages} 
                variant="outlined" 
                color="primary" 
                 hideNextButton
               hidePrevButton
                />
            </Stack>
        </ThemeProvider>
    </PaginationConatiner>
  )
}

export default CustomPagination