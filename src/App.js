import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [isSelected, setIsSelected] = useState({
    country: false,
    state: false,
    city: false,
  });
  const [selectData, setSelectData] = useState({
    country: [],
    state: [],
    city: [],
  });

  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setSelectData({
          ...selectData,
          country: data,
        });
      }).catch(err=>console.log(err));
  }, [country]);

  useEffect(() => {
    if (isSelected.country) {
      console.log("state effect");
      fetch(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setSelectData({
            ...selectData,
            state: data,
          });
        }).catch(err=>console.log(err));
    }
  }, [country, isSelected.country]);

  useEffect(() => {
    if (isSelected.state) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      )
        .then((res) => res.json())
        .then((data) => {
          setSelectData({
            ...selectData,
            city: data,
          });
        }).catch(err=>console.log(err));
    }
  }, [state, isSelected.state]);

  const handleCountryChange = (event) => {
    if (event.target.value != "Select Country") {
      setCountry(event.target.value);
      setIsSelected({
        ...isSelected,
        country: true,
      });
      // fetchState();
    } else {
      setIsSelected({
        ...isSelected,
        country: false,
      });
    }
  };

  const handleStateChange = (event) => {
    if (event.target.value != "Select State") {
      setState(event.target.value);
      setIsSelected({
        ...isSelected,
        state: true,
      });
      // fetchCities();
    } else {
      setIsSelected({
        ...isSelected,
        state: false,
      });
    }
  };

  const handleCityChange = (event) => {
    setShowResult(true);
    setCity(event.target.value);
  };

  return (
    <div className="App">
      <h1>Select Location</h1>
      <select name="country" id="country" onChange={handleCountryChange}>
        <option value="Select Country">Select Country</option>
        {selectData.country?.map((country) => (
          <option value={country}>{country}</option>
        ))}
      </select>
      <select
        name="state"
        id="state"
        onChange={handleStateChange}
        disabled={isSelected.country ? false : true}
      >
        <option value="Select State">Select State</option>
        {selectData.state?.map((state) => (
          <option value={state}>{state}</option>
        ))}
      </select>
      <select
        name="city"
        id="city"
        disabled={isSelected.state ? false : true}
        onChange={handleCityChange}
      >
        <option value="Select City">Select City</option>
        {selectData?.city?.map((city) => (
          <option value={city}>{city}</option>
        ))}
      </select>
      {showResult && (
        <p>
          You selected {city}, {state}, {country}
        </p>
      )}
    </div>
  );
}
