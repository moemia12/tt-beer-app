import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Pagination from '@material-ui/lab/Pagination';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';


import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    height: 1050,
  },
  downButton: {
    bottom: 450,

  },
  infoBar: {
    bottom: 50,
    background: '	#e7eff9',
    backgroundImage: 'linear-gradient(315deg, #e7eff9 0%, #cfd6e6 74%)',
    boxShadow: '0px 7px 20px -10px rgba(0,0,0,1)',
    backgroundColor: '#000000',
    backgroundImage: 'linear-gradient(315deg, #000000 0%, #414141 74%)',
    fontWeight: 'bold',

  },
  paginator: {
    '& > *': {
      marginLeft: theme.spacing(112),
      position: 'relative',
      bottom: 20,
      
    },
  },
  filterButton: {
    background: '	#e7eff9',
    backgroundImage: 'linear-gradient(315deg, #e7eff9 0%, #cfd6e6 74%)',
    boxShadow: '0px 7px 20px -10px rgba(0,0,0,1)',
    backgroundColor: '#000000',
    backgroundImage: 'linear-gradient(315deg, #000000 0%, #414141 74%)',
    borderRadius: 100,
    padding: 14,
    margin: theme.spacing(1),
    cursor: 'pointer',
  },
  beerFilter: {
    position: 'relative',
      top: 230,
  },
  beerFilterText: {
    position: 'absolute',
    left: 790,
    bottom: 30,
  }

}));

function App() {
  const style = useStyles();

  let totalBeers = 0;
  // Hook to initialise state
  const [beers, setBeers] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);

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
  const handlePageChange = (event) => {
    const index = parseInt(event.target.innerText)
    const offset = (index - 1) * 10;
    setFilteredBeers(beers.slice(offset, offset + 10));
  }

  // Filter by ABV function
  const filterByVolume = (min, max) => {
    console.log('click')
    const filtered = beers.filter((beer) => beer.abv > min && beer.abv < max);
    setFilteredBeers(filtered);
  }

  //Returning data from API
  return (
    <div className="App">
      {/** Intial Page logo */}
      <div className="header-image">
        <img src="/images/brewdog_logo.png" />
        <img src="/images/talentticker.png" />
      </div>

      <h6>Click Here</h6>

      {/** Scroll Down Button */}
      <Button
        className={style.downButton}
        onClick={() => window.scrollTo({
          top: 1225,
          behavior: "smooth"
        })}
        size='large'
        color="default"
        variant="text"
        fullWidth='true'
        startIcon={<ExpandMoreIcon />}
      ></Button>

      

      {/** Beer Filter */}
      <div className={style.beerFilter} style={{zIndex: '100'}} >
        <h2 className={style.beerFilterText}>Select your Alcohol By Volume</h2>
        
          <span className={style.filterButton} style={{color: 'white'}} onClick={(e) => filterByVolume(0, 5)}>ABV ??? 5 </span>
          <span className={style.filterButton} style={{color: 'white'}} onClick={(e) => filterByVolume(5, 10)}>ABV ??? 5</span>
          <span className={style.filterButton} style={{color: 'white'}} onClick={(e) => filterByVolume(10, 100)}>ABV ??? 10</span>
        
      </div>

      {/**Beer Display*/}
      <div className={style.root}>
        <ImageList rowHeight={390} cols={6}>

          <ImageListItem key="Subheader" cols={6} style={{ height: 'auto' }}></ImageListItem>

          {filteredBeers && filteredBeers.map((beer, index) => (
            <ImageListItem key={index}>
              <img src={beer.image_url} alt={beer.name} />
              <ImageListItemBar className={style.infoBar} title={beer.name} subtitle={<span>ABV: {beer.abv}</span>} />
            </ImageListItem>
          ))}

        </ImageList>
      </div>

      {/**Pagination component */}
        <Pagination
          className={style.paginator}
          count={3}
          color="secondary"
          hideNextButton={true}
          hidePrevButton={true}
          onChange={handlePageChange}
        />

    </div>
  );
}

export default App;
