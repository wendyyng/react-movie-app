import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TheatersIcon from '@mui/icons-material/Theaters';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';
// import { NavigationContainer } from './navigation.styles';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const style = {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "black",
    zIndex: 100,
}

export default function Navigation() {

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) {
      navigate("/");
    } else if (value === 1) {
      navigate("/movies");
    } else if (value === 2) {
      navigate("/tv");
    } else if (value === 3) {
      navigate("/search");
    }
  }, [value, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    // <NavigationContainer>
    <BottomNavigation value={value} onChange={handleChange} sx={style}>
      <BottomNavigationAction
        label="Trending"
        icon={<WhatshotIcon />}
        style={{ color: "white" }}
      />
      <BottomNavigationAction
        label="Movies"
        icon={<TheatersIcon />}
        style={{ color: "white" }}
      />
      <BottomNavigationAction
        label="TV Series"
        icon={<LiveTvIcon />}
        style={{ color: "white" }}
      />
      <BottomNavigationAction 
        label="Search" 
        icon={<SearchIcon />} 
        style={{ color: "white" }}
      />
    </BottomNavigation>
    // </NavigationContainer>
  );
}
