
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { Outlet } from 'react-router-dom';

const NasaPage = () => {
  const [date, setDate] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [count, setCount] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      let apiUrl = `/api/nasa/apod?`;

      if (date) {
        apiUrl += `date=${date}`;
      } else if (fromDate && toDate) {
        apiUrl += `start_date=${fromDate}&end_date=${toDate}`;
      }

      if (count) {
        apiUrl += `&count=${count}`;
      }

      const response = await axios.get(apiUrl); // Use Axios to make GET request
      setImages(response.data); // Set images state with response data
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Error fetching data'); // Set error state if request fails
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []); // Empty dependency array ensures useEffect only runs once

  return (
    <div>
      <h1>NASA APOD</h1>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>From Date:</label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <label>To Date:</label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
      </div>
      <div>
        <label>Count:</label>
        <input type="number" value={count} onChange={(e) => setCount(e.target.value)} />
      </div>
      <button onClick={fetchData}>Fetch Data</button>
      <div>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.url} alt={image.title} />
            <p>{image.title}</p>
            <p>{image.date}</p>
            <p>{image.explanation}</p>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default NasaPage;