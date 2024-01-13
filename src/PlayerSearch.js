import React, { useState } from 'react';

const PlayerSearch = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter player username"
      />
      <button type="submit">Fetch Games</button>
    </form>
  );
};

export default PlayerSearch;
