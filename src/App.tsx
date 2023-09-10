import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.sass"; // Import your custom Sass file
import Routes from "./routes/router.config";
import AppRouter from "./routes/router.config";

function App() {
  return <AppRouter />;
}

export default App;
