import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api/index";

function DeckList(){
    const history = useHistory();
    const [ decks, setDecks ] = useState([]);

    useEffect(loadDeck(), []);

    function deleteHandler(deckId){
        const confirmed = window.confirm("Delete this deck? You will not be able to recover it");
        if(confirmed){
            deleteDeck(deckId).then(loadDeck)
        }

    }

    function loadDeck() {
        listDecks().then(setDecks);
    }

return (
//displays multiple decks
<ul className="deck-cards">
    {decks.map((deck) => (
        <li key={deck.id}>
             <div className="card">
               <div className="card-body">
                  <h5 className="card-title">{deck.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {deck.cards.length} cards
                 </h6>
                 <p className="card-text">{deck.description}</p>
                  <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
                  <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                  <button className="btn btn-danger" type="button" onClick={() => deleteHandler(deck.id)}>
                        Delete
                    </button> 
                </div> 
              </div> 
        </li>
    ))}
</ul>
);
}

export default DeckList;