import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";

export default function Layout() {
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/directors")
      .then(r => r.json())
      .then(setDirectors)
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      <Outlet context={{ directors, setDirectors }} />
    </>
  );
}