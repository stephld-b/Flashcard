import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import CardList from "../Card/CardList";

function Study(){
    const [deck, setDeck] = useState([]);
    const { deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function loadDeck() {
          try{
              const getDeckFromAPI = await readDeck(deckId);
              setDeck(getDeckFromAPI);
          } catch (error){
              console.log(error);
          }
        }
        loadDeck();
    }, [deckId]);

    if(deck){
        return (
            <div>
            <div>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                     Study
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <h1>Study: {deck.name}</h1>
          </div>
          <CardList cards={deck.cards}/>
          </div>
        );
    } else {
        return <p>Loading...</p>;
    }
}

export default Study;