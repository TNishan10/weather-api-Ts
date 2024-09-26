import { City, Country } from "country-state-city";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Card, Metric, Text } from "@tremor/react";

function Sidebar() {
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState([]);

  useEffect(() => {
    setAllCountries(
      Country.getAllCountries().map((country) => ({
        value: {
          name: country.name,
          latitude: country.latitude,
          longitude: country.longitude,
          isoCode: country.isoCode,
        },
        label: country.name,
      }))
    );
  }, []);

  const handleSelectedCountry = (option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option) => {
    setSelectedCity(option);
  };

  const getWeatherDetails = () => {
    // Implement the logic to fetch weather details based on selectedCity
    // For example, you can use an API to fetch the weather details
    // and then update the weatherDetails state with the fetched data.
    if (selectedCity) {
      // Example API call (replace with actual API call)
      fetch(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${selectedCity.value.latitude},${selectedCity.value.longitude}`)
        .then(response => response.json())
        .then(data => {
          setWeatherDetails(data);
        })
        .catch(error => {
          console.error("Error fetching weather details:", error);
        });
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex space-x-1">
      {/* Sidebar Div */}
      <div className="flex flex-col space-y-10 bg-blue-950 h-screen w-[25%] p-2">
        {/* Select country and city */}
        <div className="flex flex-col justify-center space-y-5 min-w-sm">
          <Select
            options={allCountries}
            value={selectedCountry}
            onChange={handleSelectedCountry}
          />

          {selectedCountry && (
            <Select
              options={City.getCitiesOfCountry(
                selectedCountry?.value?.isoCode
              ).map((city) => ({
                value: {
                  latitude: city.latitude,
                  longitude: city.longitude,
                  name: city.name,
                },
                label: city.name,
              }))}
              value={selectedCity}
              onChange={handleSelectedCity}
            />
          )}

          <button
            onClick={getWeatherDetails}
            className="bg-green-400 w-full py-3 rounded-lg text-white text-sm font-bold hover:scale-105 transition-all duration-200 ease-in-out"
          >
            Get Weather
          </button>
        </div>

        {/* Show some details */}
        <div className="flex flex-col space-y-2">
          <p className="text-white text-lg font-semibold">
            {selectedCountry?.label} | {selectedCity?.label}
          </p>
          <p className="text-white">
            Latitude: {selectedCity?.value?.latitude} | Longitude:
            {selectedCity?.value?.longitude}
          </p>
        </div>

        {/* Day or Night */}
        
      </div>

      {/* Body Div */}
      <div className="w-[75%] h-screen">
        <div className="flex items-center justify-evenly space-x-2 mt-2">
          <Card
            decoration="top"
            decorationColor="red"
            className=" !bg-gray-100 !text-center"
          >
            <Text className="!font-semibold !text-xl">Max Temperature</Text>
            <Metric className="!text-black !font-bold">
              {weatherDetails?.current?.temp_c} &#x2103;
            </Metric>
          </Card>
          <Card
            decoration="top"
            decorationColor="green"
            className="max-w-xs !bg-gray-100 !text-center"
          >
            <Text className="!font-semibold !text-xl">Min Temperature</Text>
            <Metric className="!text-black !font-bold">
              {weatherDetails?.current?.temp_c} &#x2103;
            </Metric>
          </Card>
          <Card
            decoration="top"
            decorationColor="blue"
            className="max-w-xs !bg-gray-100 !text-center"
          >
            <Text className="!font-semibold !text-xl">Wind Direction</Text>
            <Metric className="!text-black !font-bold">
              {weatherDetails?.current?.wind_dir} &#176;
            </Metric>
          </Card>
        </div>

        {/* Charts */}
        
      </div>
    </div>
  );
}

export default Sidebar;