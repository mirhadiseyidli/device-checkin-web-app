import React, { useState } from "react";
import logo from '../images/logo.png'

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <header className="header">
      <div class="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search"
      />
    </header>
  );
}

export default Header;
