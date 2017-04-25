import React from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

class CoordForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '', coords: null, lat: "", lng: "", heros: [], userPoint: null, loading: false, error: false }
    this.onChange = this.onChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  onChange(address) {
     this.setState({ address })
   }

  getdistance(a, b) {
    if (a && b) {
      return Math.round(google.maps.geometry.spherical.computeDistanceBetween(a, b) / 1000 / 1.60934)
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

  getNumber(i) {
    if (i < 9) {
      return <span>&nbsp;&nbsp;{i + 1}.&nbsp;&nbsp;</span>
    } else {
      return <span>{i + 1}.&nbsp;&nbsp;</span>
    }
  }

  handleFormSubmit(event) {
    event.preventDefault()
    this.setState({ error: false })
    if (this.state.lat !== "" && this.state.lng !== "") {
      this.setState({ loading: true });
      const newCoords = {lat: this.state.lat, lng: this.state.lng}
      this.setState({ coords: newCoords, userPoint: this.state.address, loading: true, lat: '', lng: '', error: false }, this.updateHeros);
    } else if ((this.state.lat === '' && this.state.lng !== '') || (this.state.lat !== '' && this.state.lng === '')) {
      this.setState({ error: true })
    } else {
      this.setState({ loading: true });
      geocodeByAddress(this.state.address,  (err, latLng) => {
        if (err) { console.log(err) }
        const loc = this.state.address
        this.setState({ coords: latLng, userPoint: loc, address: '', loading: true, error: false }, this.updateHeros);
      })
    }
  }

  update(field) {
    return(e) => this.setState({
      [field]: e.currentTarget.value, error: false
    });
  }

  getDistancePhrase(hero, userPoint) {
    const d = userPoint === "" ? 'from coordinates' : `from ${this.state.userPoint}`
    if (hero.location.distance) {
      return (
        <span>
          <span className="hero-comics">{`distance ${d}: `}<mark>{hero.location.distance}</mark></span>
          <span className="divider">•</span>
        </span>
      )
    } else {
      return null;
    }
  }

  updateHeros() {
    let heros = this.props.heros
    if (this.state.userPoint !== "") {
        if (this.state.coords.lat !== 27.6648274 && this.state.coords.lng !== -81.51575350000002) {
          for (let i = 0; i < heros.length; i++) {
            const location = new google.maps.LatLng(heros[i].location.lat, heros[i].location.lng);
            const userPoint = new google.maps.LatLng(this.state.coords.lat, this.state.coords.lng);
            heros[i].location.distance = this.getdistance(userPoint, location);
          }
        } else {
          heros = this.sortByKeys(this.props.heros, "comics", "available");
        }
    } else {
      for (let i = 0; i < heros.length; i++) {
        const location = new google.maps.LatLng(heros[i].location.lat, heros[i].location.lng);
        const userPoint = new google.maps.LatLng(this.state.coords.lat, this.state.coords.lng);
        heros[i].location.distance = this.getdistance(userPoint, location);
      }
    }
    this.setState({heros: heros, loading: false})
  }

  getContent() {
    if (this.state.heros.length > 0) {
      let heros = this.state.heros;
      if (this.state.heros.some((x) => x.location.distance)) {
        heros = this.sortByKeys(this.state.heros, "location", "distance", true)
      }
      return (
        <div>
          {heros.map((hero, i) => {
            return (
              <li className="hero-line" key={i}>
                {this.getNumber(i)}
                <a href={hero.urls[0].url} target="_blank">
                  <img className="img-circle" src={hero.thumbnail.path + '.' + hero.thumbnail.extension} />
                </a>
                <span className="hero-name">{hero.name}</span><span className="divider">•</span>
                <span className="hero-location">located: {hero.location.city}</span><span className="divider">•</span>
                {this.getDistancePhrase(hero, this.state.userPoint)}
                <span className="hero-details"><a href={hero.urls[0].url} target="_blank">Details</a></span>
              </li>
            )
          })}
        </div>
      )
    } else {
      return null;
    }
  }

  getError() {
    if (this.state.error) {
      return <span className="text-warning text-center">please, enter both coordinates</span>
    } else {
      return <span className="text-warning text-center">&nbsp;</span>
    }
  }

  getLoading() {
    if (this.state.loading) {
      return <span>&nbsp;&nbsp;&nbsp;loading...</span>
    } else {
      return null;
    }
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <div>
        <ul>
          <h3 id="form-title" className="heros-15-title text-left">Bonus:</h3>
          <h6 id="form-subtitle">5. By implementing a simple UI, give the user the ability to input any coordinates or location (google maps autocomplete) and see which of the top 15 superheros are nearest.</h6>
          <form className="location-form" onSubmit={this.handleFormSubmit}>
            <div className="input-group">
              <div className="form-group">Enter coordinates</div>
            <input type="text" className="form-control" onChange={this.update("lat")} placeholder="Latitude, i.e. 40.730610" value={this.state.lat} />
            <input type="text" className="form-control" onChange={this.update("lng")} placeholder="Longitude, i.e. -73.935242" value={this.state.lng} />
            <div>{this.getError()}</div>
            </div>
            <div className="form-group">Or choose the location:</div>
              <PlacesAutocomplete inputProps={inputProps} />
            <div className="form-group">
              <button className="btn btn-default" type="submit">Find Heroes</button>{this.getLoading()}
            </div>
          </form>
          {this.getContent()}
        </ul>
        <div className="footer-text">
          <p className="text-center">
            <span>made by <a href="http://alex-naumov.me" target="_blank">Aleksei Naumov</a></span>
            <span className="divider">•</span>
            <span><a href="http://github.com/naumov78" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a></span>
          </p>
        </div>
      </div>
    )
  }
}

export default CoordForm;
