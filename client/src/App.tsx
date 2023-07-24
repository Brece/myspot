import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './styles/main.css';
import { urls } from './urls';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

function App() {
  useEffect(() => {
    // test api integration
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api",
        { method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
      });

      console.log('API response:', await response.json());
    };
    // fetchData();
  }, []);

  return (
    <Routes>
      <Route path={urls.home} element={<Home />} />

      {/* wildcard */}
      <Route path={urls.notFound} element={<NotFound />} />
    </Routes>
  );
}

export default App;
