import React, { useState } from 'react';
import PlayerSearch from './PlayerSearch';
import axios from 'axios';

const App = () => {
  const [gamesData, setGamesData] = useState('');
  const [monthsAgo, setMonthsAgo] = useState(36); // Privzeto število mesecev

  const fetchGames = async (username) => {
    try {
      let allGamesData = '';
      const currentDate = new Date();
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth() + 1; // getMonth() vrne mesec od 0 do 11

      for (let i = 0; i < monthsAgo; i++) {
        const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
        const url = `https://api.chess.com/pub/player/${username}/games/${currentYear}/${formattedMonth}/pgn`;

        const response = await axios.get(url);
        allGamesData += response.data + "\n\n";

        // Nastavitev meseca in leta za prejšnji mesec
        if (currentMonth === 1) {
          currentMonth = 12;
          currentYear--;
        } else {
          currentMonth--;
        }
      }

      setGamesData(allGamesData);
    } catch (error) {
      console.error("Error fetching games:", error);
      setGamesData('Napaka pri pridobivanju partij. Preverite uporabniško ime in poskusite znova.');
    }
  };

  const downloadPGN = () => {
    const element = document.createElement("a");
    const file = new Blob([gamesData], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "games.pgn";
    document.body.appendChild(element);
    element.click();
  };

  const handleMonthsChange = (e) => {
    setMonthsAgo(e.target.value);
  };

  return (
    <div>
      <PlayerSearch onSearch={fetchGames} />
      <div>
        <label>
          Število mesecev nazaj:
          <input
            type="number"
            value={monthsAgo}
            onChange={handleMonthsChange}
          />
        </label>
        <button onClick={downloadPGN}>Prenesi kot PGN</button>
        {gamesData ? (
          <textarea value={gamesData} readOnly style={{ width: '100%', height: '400px' }} />
        ) : 'Vnesite uporabniško ime in pridobite partije.'}
      </div>
    </div>
  );
};

export default App;
