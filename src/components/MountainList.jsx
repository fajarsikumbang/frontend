import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MountainList = () => {
  const [mountains, setMountains] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/mountains')
      .then(response => {
        setMountains(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div>
      <h1>Daftar Gunung</h1>
      <ul>
        {mountains.map((mountain) => (
          <li key={mountain.id}>
            <h3>{mountain.name}</h3>
            <p>Lokasi: {mountain.location}</p>
            <p>Ketinggian: {mountain.height} mdpl</p>
            <Link to={`/mountain/${mountain.id}`}>Lihat Detail</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MountainList;
