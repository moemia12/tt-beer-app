import { useEffect, useState } from 'react'
import './App.css';

function App() {

  //Hook to initialise state
  const [beers, setBeers] = useState(null);

  //Hook to retrieve information from API
  useEffect(() => {
    getBeers();

    async function getBeers() {
      const res = await fetch("https://api.punkapi.com/v2/beers");
      const data = await res.json();

      setBeers(data);
    }
  }, []);

  //Returning data from API
  return (
    <div className="App">

      titleRTRT


      {beers && (
        <div className="beers">

          {beers.map((beer, index) => (

            <div key={index}>
              <h2>{beer.name}</h2>
              <h5><text>{beer.description}</text></h5>
              <img src={beer.image_url}></img>
            </div>

          ))}


        </div>
      )}

    </div>
  );
}

export default App;
