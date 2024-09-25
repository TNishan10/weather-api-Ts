import { useEffect, useState } from "react";
import Select from "react-select";
import {City, Country} from "country-state-city";


function App() {

  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCity, setSelectedCity] = useState({});
  useEffect(() => {
    setAllCountries(
      Country.getAllCountries().map((country) => ({
      value:{
        latitude: country.latitude,
        longitude: country.longitude,
        isoCode: country.isoCode,
      },
      label:country.name,
    }))
  );
  }, [])

  const handleSelectedCounty = (option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSeclectedCity = (option) => {
    setSelectedCity(option);
  }

  return (
    <div className="App">
      {/*Side Bar*/}
      <div className = "flex flex-col space-y-3">
        {/*Form*/ }
        <Select options={allCountries} value={selectedCountry} onChange={handleSelectedCounty} />


        <Select />

        <button className="bg-green-400 w-full py-3 text-white text-sm font-bold hover:scale-105 transition-all duration-200 ease-in-out">Get Weather</button>
       </div>
      {/*Body */}
      <div>

        </div>
    </div>
  );
}

export default App;
