import React from 'react';

// var client = redis.createClient();

class Heros extends React.Component {

  constructor(props) {
    super(props)
    this.state = { heros: [], fetching: false }
    this.geoTags = {
      "NYC": [40.730610, -73.935242],
      "Boston": [42.364506, -71.038887],
      "DC": [38.894207, -77.035507],
      "Chicago": [41.881832, -87.623177],
      "Indianapolis": [39.832081, -86.145454],
      "LA": [34.052235, -118.243683],
      "SF": [37.733795, -122.446747],
      "Dallas": [32.897480, -97.040443],
      "Denver": [39.742043, -104.991531],
      "Seattle": [47.608013, -122.335167],
      "New Orleans": [29.951065, -90.071533],
      "Orlando": [28.538336, -81.379234],
      "Baltimore": [39.299236, -76.609383],
      "Minneapolis": [44.986656, -93.258133],
      "Cleveland": [41.505493, -81.681290]
    }
    // this.redis = require('redis');
  }

  getHeros() {
    this.setState({ heros: [], fetching: true })
    for(let i = 0; i < 1500; i += 100 ) {
      this.props.fetchAllHeros(i).then((result) => {
        console.log(this.state.heros.length);
        if (this.state.heros.length < 1300) {
          this.setState({ heros: this.state.heros.concat(result.heros) })
        } else {
          debugger
          this.setState({ heros: this.state.heros.concat(result.heros), fetching: false })
        }
      })
    }
  }



  sortByKeys(array, key1, key2) {
    return array.sort((a, b) => {
        const x = a[key1][key2];
        const y = b[key1][key2];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}



  getContent() {
    const allHeros = this.sortByKeys(this.state.heros, "comics", "available").slice(0, 15);
    debugger
    if (allHeros.length > 0) {
      return (
        <ul>
          {allHeros.map((hero, i) => {
            return (
              <li key={i}>
                {hero.name} - number of comics {hero.comics.available}
              </li>
            )
          })}
        </ul>
      )
    } else {
      return null;
    }
  }


  render() {
    console.log(this.geoTags);
    debugger
    if (!this.state.fetching) {
      return (
        <div>Hello world!
          <div><button onClick={() => this.getHeros()}>Get Heros</button></div>
          <div>{this.getContent()}</div>
        </div>
      );
    } else {
      debugger
      return (
        <div>Hello world!
          <div><button onClick={() => this.getHeros()}>Get Heros</button></div>
          <div>fetching heros...</div>
        </div>
      );
    }
  }

}

export default Heros;
