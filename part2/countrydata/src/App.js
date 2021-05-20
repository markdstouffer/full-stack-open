import React, { useEffect, useState } from 'react'
import axios from 'axios'
//
const WeatherData = ({weather, country}) => {
  let image;
  try {
    image = weather.weather_icons.length===1
    ? <img src={weather.weather_icons[0]} width='50' height='50' alt="weather icon"/>
    : ""
  } catch {
    return <div></div>
  }
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <b>temperature: </b>{weather.temperature} Celcius <br />
      {image} <br />
      <b>wind: </b>{weather.wind_speed} mph
    </div>
  )
}

const Weather = ({country}) => {
  const [weatherData, setWeatherData] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
  console.log(url)
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        console.log(response)
        if (response.statusText==="OK") {
          setWeatherData(response.data)
        } 
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  let data;
  try {
    data = weatherData.current
    ? weatherData.current
    : ""
  } catch {
    return <div></div>
  }
  return (
    <div>
      <WeatherData weather={data} country={country}/>
    </div>
  )
}

const OneCountryData = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital} <br/>
      population {country.population}
      <h2>languages</h2>
      <ul>{country.languages.map(x => <li key={x.iso639_1}>{x.name}</li>)}</ul>
      <img src={country.flag} width='150' height='85' alt="A flag"/>
      <Weather country={country} />
    </div>
  )
}

const PrintCountries = ({countries, setFilter}) => {
  if (countries.length === 1) 
    return <OneCountryData country={countries[0]}/>
  if (countries.length > 10)
    return <div>Too many matches, specify another filter...</div> 
  return (
    countries.map((country) => (
      <div key={country.alpha3Code}>
        {country.name}
        <button onClick={(e) => setFilter(country.name)}>show</button>
      </div>
    ))
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        setCountries(response.data)
        console.log('Setting countries data...', response.data)
      })
    }, [])

  const filteredCountries = countries.filter(
    x => x.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      find a country <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <PrintCountries countries={filteredCountries} setFilter={setFilter} />
    </div>
  )
}

export default App