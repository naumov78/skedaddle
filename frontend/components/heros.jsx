import React from 'react';
import CoordForm from './coord_form';

class Heros extends React.Component {

  constructor(props) {
    super(props)
    this.state = { heros: [], fetching: false, fetched: false, showBonus: true }
    this.geoTags = [
      { city: "NYC", lat: 40.730610, lng: -73.935242 },
      { city: "Boston", lat: 42.364506, lng: -71.038887 },
      { city: "DC", lat: 38.894207, lng: -77.035507 },
      { city: "Chicago", lat: 41.881832, lng: -87.623177 },
      { city: "Indianapolis", lat: 39.832081, lng: -86.145454 },
      { city: "LA", lat: 34.052235, lng: -118.243683 },
      { city: "SF", lat: 37.733795, lng: -122.446747 },
      { city: "Dallas", lat: 32.897480, lng: -97.040443 },
      { city: "Denver", lat: 39.742043, lng: -104.991531 },
      { city: "Seattle", lat: 47.608013, lng: -122.335167 },
      { city: "New Orleans", lat: 29.951065, lng: -90.071533 },
      { city: "Orlando", lat: 28.538336, lng: -81.379234 },
      { city: "Baltimore", lat: 39.299236, lng: -76.609383 },
      { city: "Minneapolis", lat: 44.986656, lng: -93.258133 },
      { city: "Cleveland", lat: 41.505493, lng: -81.681290 }
    ]
    this.bostonHeros = [];
  }

  getHeros() {
    this.setState({ heros: [], fetching: true })
    for(let i = 0; i < 1500; i += 100 ) {
      this.props.fetchAllHeros(i).then((result) => {
        if (this.state.heros.length < 1385) {
          this.setState({ heros: this.state.heros.concat(result.heros) })
        } else {
          this.setState({ heros: this.state.heros.concat(result.heros), fetching: false, fetched: true, showBonus: true})
        }
      })
    }
  }

  getDistance(a, b) {
    if (a && b) {
      const dist = Math.round(google.maps.geometry.spherical.computeDistanceBetween(a, b) / 1000 / 1.60934)
      return dist;
    }
  }

  sortByKeys(array, key1, key2, desc) {
    if (desc) {
      return array.sort((a, b) => {
          const x = a[key1][key2];
          const y = b[key1][key2];
          return ((x > y) ? 1 : ((x < y) ? -1 : 0));
      });
    } else {
      return array.sort((a, b) => {
          const x = a[key1][key2];
          const y = b[key1][key2];
          return ((x < y) ? 1 : ((x > y) ? -1 : 0));
      });
    }
  }

  includeHero(hero) {
    if (this.bostonHeros.includes(hero)) {return true}
    return false;
  }

  helpBoston(hero) {
    const boston = new google.maps.LatLng(42.360082,-71.058880);
    const heroLocation = new google.maps.LatLng(hero.location.lat, hero.location.lng);
    const distance = this.getDistance(boston, heroLocation);
    if (distance && distance < 500 && !this.includeHero(hero)) {
      hero.location.distanceFromBoston = distance
      this.bostonHeros.push(hero);
    }
  }

  getBostonHeros() {
    if (this.bostonHeros.length > 0 && this.state.fetched) {
      const bostonHeros = this.sortByKeys(this.bostonHeros, "location", "distanceFromBoston", true);
      return (
        <ul className="boston-list">
          <h3 className="heros-15-title text-left">Save Boston:</h3>
          <h6>4. Magneto is wreaking havoc in Boston! find the heroes that are within 500 miles of Boston (sorted by closest)!</h6>
          {bostonHeros.map((hero, i) => {
            return (
              <li className="hero-line" key={i}>
                {this.getNumber(i)}
                <a href={hero.urls[0].url} target="_blank">
                  <img className="img-circle" src={hero.thumbnail.path + '.' + hero.thumbnail.extension} />
                </a>
                <span className="hero-name">{hero.name}</span><span className="divider">•</span>
                <span className="hero-location">located: {hero.location.city}</span><span className="divider">•</span>
                <span className="hero-comics">distance from Boston: <mark>{hero.location.distanceFromBoston}</mark></span><span className="divider">•</span>
                <span className="hero-details"><a href={hero.urls[0].url} target="_blank">Details</a></span>
              </li>
            )
          })}
        </ul>
      )
    } else {
      return null;
    }
  }

  getNumber(i) {
    if (i < 9) {
      return <span>&nbsp;&nbsp;{i + 1}.&nbsp;&nbsp;</span>
    } else {
      return <span>{i + 1}.&nbsp;&nbsp;</span>
    }
  }

  getContent() {
    const allHeros = this.sortByKeys(this.state.heros, "comics", "available").slice(0, 15);
    allHeros.forEach((hero) => {
    })
    this.updatedHeros = [];
    if (allHeros.length > 0 && this.state.fetched) {
      return (
        <ul className="general-list">
          <h3 className="heros-15-title text-left">15 most popular superheros:</h3>
          <h6>1. Retrieve the 15 most popular super heroes based on the amount of comics they have appeared in</h6>
          <h6>2. Sort the heroes in descending order</h6>
          {allHeros.map((hero, i) => {
            hero.location = this.geoTags[i]
            this.updatedHeros.push(hero)
            this.helpBoston(hero);
            return (
              <li className="hero-line" key={i}>
                {this.getNumber(i)}
                <a href={hero.urls[0].url} target="_blank">
                  <img className="img-circle" src={hero.thumbnail.path + '.' + hero.thumbnail.extension} />
                </a>
                <span className="hero-name">{hero.name}</span><span className="divider">•</span>
                <span className="hero-location">located: {hero.location.city}</span><span className="divider">•</span>
                <span className="hero-comics">amount of comics: <mark>{hero.comics.available}</mark></span><span className="divider">•</span>
                <span className="hero-details"><a href={hero.urls[0].url} target="_blank">Details</a></span>
              </li>
            )
          })}
        </ul>
      )
    } else {
      return null;
    }
  }

  getButton() {
    if (!this.state.fetched) {
      return (
        <div className="main-screen">
            <button className="btn btn-primary center-block" onClick={() => this.getHeros()}>Get Heros</button>
        </div>
      )
    } else {
      return null;
    }
  }

  getBonusForm() {
    if (this.state.showBonus) {
      return <CoordForm heros={this.updatedHeros} />
    } else {
      return null;
    }
  }

  render() {
    if (!this.state.fetching) {
      return (
        <div className="container-fluid">
            {this.getButton()}
          <div>{this.getContent()}</div>

          <div>{this.getBostonHeros()}</div>
          {this.getBonusForm()}
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
            {this.getButton()}
            <div className="spinner">
              <i className="fa fa-spinner fa-pulse fa-2x fa-fw center-block"></i>
            </div>
        </div>
      );
    }
  }

}

export default Heros;
