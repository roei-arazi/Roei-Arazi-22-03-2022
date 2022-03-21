import React from 'react';
import { Route, Routes } from 'react-router';
import { Header } from './cmps/Header';
import { WeatherFavorites } from './pages/WeatherFavorites';
import { WeatherMain } from './pages/WeatherMain';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path='/favorites' element={<WeatherFavorites />} />
          <Route path='/:cityKey/:cityName' element={<WeatherMain />} />
          <Route path='/' element={<WeatherMain />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
