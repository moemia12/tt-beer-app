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
  downButton: {
    bottom: 380,
  },
  infoBar: {
    bottom: 50,
    background: '	#686868',
    boxShadow: '0px 5px 19px 15px rgba(0,0,0,0.7);'
  },
  paginator: {
    '& > *': {
      marginLeft: theme.spacing(111),
      position:'relative',
      bottom: 300,
    },
  },
  filterButton: {
    backgroundColor: '#e7eff9',
    backgroundImage: 'linear-gradient(315deg, #e7eff9 0%, #cfd6e6 74%)',
    boxShadow: '0px 1px 3px 1px rgba(0,0,0,0.7);',
    borderRadius: 100,
    height: 100,
    width: 200,
    margin: theme.spacing(1),
    top: 230,
  },
  beerFilterText: {
    position: 'absolute',
    left: 730,
    bottom: -250,
  }

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
        top: 1125,
        behavior: "smooth"
      })}
      size='large'
      color="default"
      variant="text"
      fullWidth='true'
      startIcon={<ExpandMoreIcon/>}
      ></Button>

      {/** Beer Filter */}
      <div>
        <h1 className={style.beerFilterText}>Select your Alcohol By Volume</h1>
        <Button className={style.filterButton}>Work Night <br/>ABV ⬅️ 5 </Button>
        <Button className={style.filterButton}>Weekend <br/>ABV ➡️ 5</Button>
        <Button className={style.filterButton}>Holiday <br/>ABV ➡️ 10</Button>
      </div>

      {/**Beer Display*/}
      <div className={style.root}>
        <ImageList rowHeight={390} cols={5}>

          <ImageListItem key="Subheader" cols={5} style={{ height: 'auto' }}></ImageListItem>
           
          {filteredBeers && filteredBeers.map((beer, index) => (
            <ImageListItem key={index}>
              <img src={beer.image_url} alt={beer.name}/>
              <ImageListItemBar className={style.infoBar} title={beer.name} subtitle={<span>ABV: {beer.abv}</span>}/>
            </ImageListItem>
          ))}

        </ImageList>
      </div>

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

    </div>
  );
}

export default App;
