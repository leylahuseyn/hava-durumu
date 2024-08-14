import React, { useState } from 'react';

const API_KEY = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=16596fe956171a7376f2ba91213e3499';

interface City {
  name: string;
  temp: number;
}

function App() {
  const [city, setCity] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (city === '') return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=16596fe956171a7376f2ba91213e3499`
      );
      const data = await response.json();
      console.log(data);
      if (data.cod !== 200) {
        alert('Şəhər tapılmadı!');
        return;
      }

      setCities([...cities, { name: city, temp: data.main.temp }]);
      setCity('');
    } catch (error) {
      console.error('Xəta baş verdi:', error);
    }
  };

  const handleRemoveCity = (cityName: string) => {
    setCities(cities.filter((c) => c.name !== cityName));
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value as 'metric' | 'imperial');
  };

  return (
    <div>
      <h1>Hava Proqnozu</h1>
      <form onSubmit={handleAddCity}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Şəhər adı daxil edin"
        />
        <button type="submit">Əlavə et</button>
      </form>
      <div>
        <label>
          Vahidləri seçin:
          <select value={unit} onChange={handleUnitChange}>
            <option value="metric">Selsi</option>
            <option value="imperial">Farenheyt</option>
          </select>
        </label>
      </div>
      <ul>
        {cities.map((c) => (
          <li key={c.name}>
            {c.name}: {c.temp}°
            <button onClick={() => handleRemoveCity(c.name)}>−</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
