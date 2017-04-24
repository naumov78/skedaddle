import React from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

class CoordForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '', coords: null, heros: [], userPoint: null, loading: false }
    this.onChange = this.onChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  onChange(address) {
     this.setState({ address })
   }

  getDistanse(a, b) {
    if (a && b) {
      // debugger
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
    this.setState({ loading: true });
    debugger
    geocodeByAddress(this.state.address,  (err, latLng) => {
      if (err) { console.log(err) }
      console.log(latLng);
      this.setState({ coords: latLng, userPoint: this.state.address, loading: true }, this.updateHeros);
    })
  }

  // with empty input give incorrectly sorted result
  updateHeros() {
    const heros = this.props.heros
    debugger
    if (this.state.coords.lat !== 27.6648274 && this.state.coords.lng !== -81.51575350000002) {
      for (let i = 0; i < heros.length; i++) {
        const location = new google.maps.LatLng(heros[i].location.lat, heros[i].location.lng);
        const userPoint = new google.maps.LatLng(this.state.coords.lat, this.state.coords.lng);
        // debugger
        heros[i].location.distanse = this.getDistanse(userPoint, location);
      }
    }
    debugger
    this.setState({heros: heros, loading: false})
  }

  getContent() {
    if (this.state.heros.length > 0) {
    const heros = this.sortByKeys(this.state.heros, "location", "distanse", true)
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
                <span className="hero-comics">distanse from {this.state.userPoint}: <mark>{hero.location.distanse}</mark></span><span className="divider">•</span>
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

  getLoading() {
    if (this.state.loading) {
      return <span>&nbsp;&nbsp;&nbsp;loading...</span>
    } else {
      return null;
    }
  }


  render() {
    debugger

    const styles = {
      input: {width: '70%'}
    }

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <ul>
        <h3 id="form-title" className="heros-15-title text-left">Bonus:</h3>
        <h6 id="form-subtitle">5. By implementing a simple UI, give the user the ability to input any coordinates or location (google maps autocomplete) and see which of the top 15 superheros are nearest.</h6>
        <form className="location-form" onSubmit={this.handleFormSubmit}>
          <div className="form-group">Find heros near:</div>
            <PlacesAutocomplete inputProps={inputProps} />
            <button className="btn btn-default" type="submit">Submit</button>{this.getLoading()}
        </form>
        {this.getContent()}
      </ul>
    )
  }
}

export default CoordForm;
