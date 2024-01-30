import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import UserTable from "./components/UserTable";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={UserTable} />
      </div>
    </BrowserRouter>
  );
}

export default App;
