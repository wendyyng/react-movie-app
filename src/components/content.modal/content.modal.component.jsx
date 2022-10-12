import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import './content.modal.styles.css'
import YouTubeIcon from '@mui/icons-material/YouTube';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  // width: 400,
    // bgcolor: 'background.paper',
    //   border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
    // width: "70%",
    // height: "70%",
    // backgroundColor: "#fff",
    // border: "1px solid #282c34",
    // borderRadius: 10,
    // color: "white",

    // boxShadow: shadows[5],
    // padding: theme.spacing(1, 1, 3),
};

const paperStyle = {
    // width: "80%",
    height: "80%",
    backgroundColor: "#000000",
    // border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(1, 1, 3),
}

const ContentModal = ({ children, media_type, id }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content, setContent] = useState();
    const [ video, setVideo] = useState();

    const fetchData = async() => {
        const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        )
        console.log(data)
        setContent(data)
    }

    const fetchVideo = async() => {
        const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        )
        console.log(data.results[0].key)
        setVideo(data.results[0].key)
    }

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, [])

  return (
    <div>
      <div 
      onClick={handleOpen}
      className="media"
      style={{ cursor: "pointer" }}
      color="inherit"
      >
        {children }
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        
      >
        <Fade in={open}>
        <Box sx={style}>
         {content && (
            <div style={paperStyle}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    {/* <Carousel id={id} media_type={media_type} /> */}
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ContentModal