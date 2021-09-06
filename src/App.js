import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Pagination from '@material-ui/lab/Pagination';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  downButton: {
    bottom: 380,
  },
  paginator: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(111),
      marginBottom: theme.spacing(-50)
    },
  },

}));

function App() {
  const style = useStyles();

  let totalBeers = 0;
  // Hook to initialise state
  const [beers, setBeers] = useState(null);
  const [filteredBeers, setFilteredBeers] = useState(null);

  // Hook to retrieve information from API
  useEffect(() => {
    getBeers();

    async function getBeers() {
      const res = await fetch("https://api.punkapi.com/v2/beers");
      const data = await res.json();

      totalBeers = data.length
      setBeers(data);
      setFilteredBeers(data.slice(0, 10));
    }
  }, []);

  // Pagination function
  function handlePageChange(event) {
    const index = parseInt(event.target.innerText)
    const offset = (index - 1) * 10;
    setFilteredBeers(beers.slice(offset, offset + 10));
  }

  // Filter by ABV function
  function filterByVolume() {
    beers.filter((beer) => beer.abv > 3);
  }

  

  //Returning data from API
  return (
    <div className="App">
      {/**Intial Page logo */}
      <div className="header-image">
        <img src="/images/brewdog_logo.png" />
        <img src="/images/talentticker.png" />
      </div>

      <Button
      className={style.downButton} 
      onClick={() => window.scrollTo({
        top: 925,
        behavior: "smooth"
      })}
      size='large'
      color="default"
      variant="text"
      fullWidth='true'
      startIcon={<ExpandMoreIcon/>}
      ></Button>
      

      {/**Pagination component */}
      <div className={style.paginator}>
        <Pagination 
        count={3} 
        color="primary" 
        hideNextButton={true} 
        hidePrevButton={true} 
        onChange={handlePageChange}
        />
      </div>

      {/**Beer Display*/}
      <div className={style.root}>
        <ImageList rowHeight={390} cols={5}>
          <ImageListItem key="Subheader" cols={5} style={{ height: 'auto' }}>
           
          </ImageListItem>
          {filteredBeers && filteredBeers.map((beer, index) => (
            <ImageListItem key={index}>
              <img src={beer.image_url} alt={beer.name}  />
              <ImageListItemBar
                title={beer.name}
                subtitle={<span>ABV: {beer.abv}</span>}              
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>

       {beers && (
        <div className="beers">

          {beers.map((beer, index) => (

            <div className="beer" key={index}>
              <h2>{beer.name}</h2>
              <h5><text>{beer.description}</text></h5>
              <img src={beer.image_url} alt=''></img>
            </div>
          ))}

        </div>
      )} 

    </div>
  );
}

export default App;
