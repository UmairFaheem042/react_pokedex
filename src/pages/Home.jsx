import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Feed from "../components/Feed";
import LoadingScreen from "../components/LoadingScreen";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offSet, setOffSet] = useState(() => {
    const storedOffSet = sessionStorage.getItem("offset");
    return storedOffSet ? parseInt(storedOffSet, 10) : 0;
  });
  const [loading, setLoading] = useState(true);

  function handleNextPage() {
    const newOffSet = offSet + 50;
    setOffSet(newOffSet);
    sessionStorage.setItem("offset", newOffSet.toString());
  }

  function handlePreviousPage() {
    const newOffSet = offSet <= 50 ? 0 : offSet - 50;
    setOffSet(newOffSet);
    sessionStorage.setItem("offset", newOffSet.toString());
  }

  useEffect(() => {
    async function fetchPokemon() {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offSet}`;

      const res = await fetch(apiUrl);
      const data = await res.json();

      setPokemons(data.results);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    fetchPokemon();
  }, [offSet]);

  useEffect(() => {
    setLoading(true);
  }, [offSet]);

  return (
    <div className="Home maxWidth">
      {loading && <LoadingScreen />}
      {!loading && (
        <>
          <Header />
          <Feed pokemons={pokemons} />
          <div className="pagination">
            <button onClick={handlePreviousPage} className="btn">
              Previous
            </button>
            <button onClick={handleNextPage} className="btn">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
