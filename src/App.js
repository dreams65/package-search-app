import React, { useEffect } from "react";
import { useState } from "react";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer";

const App = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("https://data.jsdelivr.com/v1/stats/packages/")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])
    
      if (error) {
        return <div>Erro: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      }
    return(
        <>
        <Header/>
        <main className="main">
            <Search items={items}/>
        </main>
        <Footer/>
        </>
    )
}

export default App;