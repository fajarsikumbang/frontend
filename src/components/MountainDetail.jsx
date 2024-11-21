import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Map from './Map'; // Mengimpor peta

const MountainDetail = () => {
  const { id } = useParams(); // Mengambil parameter id dari URL
  const [mountain, setMountain] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Mengambil data gunung berdasarkan ID
    axios.get(`http://127.0.0.1:8000/api/mountains/${id}`)
      .then(response => {
        setMountain(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the mountain details!", error);
      });
  }, [id]);

  useEffect(() => {
    // Mengambil data cuaca berdasarkan koordinat gunung
    if (mountain) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=-6.75&lon=110.5&appid=b6c737ef046e151011835bfc4d051845&units=metric`)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the weather data!", error);
        });
    }
  }, [mountain]); // Menjalankan efek setiap kali mountain berubah

  if (!mountain) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold">{mountain.name}</h1>
      <p><strong>Lokasi:</strong> {mountain.location}</p>
      <p><strong>Ketinggian:</strong> {mountain.height} mdpl</p>
      <p><strong>Deskripsi:</strong> {mountain.description}</p>

      {/* Peta lokasi gunung */}
      <h2 className="text-xl mt-6">Peta Lokasi</h2>
      <Map lat={-6.75} lon={110.5} name={mountain.name} />

      {/* Cuaca */}
      {weather && (
        <div className="mt-6">
          <h2 className="text-xl">Cuaca Saat Ini</h2>
          <p><strong>Suhu:</strong> {weather.main.temp} °C</p>
          <p><strong>Kelembapan:</strong> {weather.main.humidity} %</p>
          <p><strong>Deskripsi:</strong> {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default MountainDetail;
