import React from 'react'
import { img_300 } from '../../config/config'
import { unavailable } from '../../config/config'
import { Badge } from '@mui/material'
import './single.content.styles.css'
import ContentModal from '../content.modal/content.modal.component'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
          main: "#002984"
        },
        secondary: {
          main: "#ba000d"
        }
    }
})

const SingleContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
}) => {

  return (
    <>
     <ContentModal media_type={media_type} id={id}>
      <ThemeProvider theme={darkTheme}>
        {
          vote_average > 1 ? 
          <Badge
          badgeContent={vote_average.toFixed(1)}
          color={vote_average > 6 ? "primary" : "secondary"}
        />
          :
          ""
        }
      </ThemeProvider>
        <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
    </>
  )
}

export default SingleContent