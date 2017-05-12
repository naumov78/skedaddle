# Superheroes

Superheroes is small web app that allows to get the list of fifteen most popular superheroes using Marvel API.
It assigns 15 cities to the heroes and sorts the list in descending order.
In "Saving Boston" app renders all superheroes within 500 miles from Boston, sorted by distance.
As a bonus a User Interface was implemented and it allows to render superheroes on users coordinates or location input using Google Maps API.

Superheroes are built on React.js and Redux and using Marvel and Google Maps APIs.






[Live App](http://alex-naumov.me/skedaddle/)


#### Features

In order to fetch all heroes and circumvent the 100 heroes per request Marvel limit I implemented this function

```javascript
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
```

Mission "Saving Boston" was implemented in the following way:

All the heroes within 500 mile were found and pushed to bostonHeros array
```javascript
helpBoston(hero) {
  const boston = new google.maps.LatLng(42.360082,-71.058880);
  const heroLocation = new google.maps.LatLng(hero.location.lat, hero.location.lng);
  const distance = this.getDistance(boston, heroLocation);
  if (distance && distance < 500 && !this.includeHero(hero)) {
    hero.location.distanceFromBoston = distance
    this.bostonHeros.push(hero);
  }
}
```
The heroes were sorted and rendered

```javascript

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

getBostonHeros() {
  if (this.bostonHeros.length > 0 && this.state.fetched) {
    const bostonHeros = this.sortByKeys(this.bostonHeros, "location", "distanceFromBoston", true);
    return (
      <ul className="boston-list">
        <h3 className="heros-15-title text-left">Saving Boston:</h3>
        <h6>3. Magneto is wreaking havoc in Boston! Find the heroes that are within 500 miles of Boston (sorted by closest)!</h6>
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
```

##### Index page
![index](/app/assets/images/heroes.png)

##### Fetched and sorted heroes
![sorted](/app/assets/images/heroes1.png)

##### Coordinates and Location UI
![location](/app/assets/images/heroes2.png)
