import React, { useState } from "react";
import './App.css';
import Table from "./components/table";
import Header from "./components/header";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Header onSearch={setSearchTerm}></Header>
      <Table searchTerm={searchTerm}></Table>
    </div>
  );
}

export default App;
