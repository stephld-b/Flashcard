import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard} from "../../utils/api/index";

function Deck(){
const [deck, setDeck] = useState({cards: []});
const { deckId } = useParams();
const history = useHistory();


useEffect(loadDeck, [deckId]);

function loadDeck() {
  readDeck(deckId).then(setDeck);
}

function deleteThisDeck(){
  const confirmed = window.confirm("Delete this deck? You will not be able to recover it");
  if(confirmed){
    deleteDeck(deck.id).then(() => history.push("/"));
  }

}

function deleteThisCard(cardId){
  const confirmed = window.confirm("Delete this card? You will not be able to recover it");
  if(confirmed){
      deleteCard(cardId).then(loadDeck);
  }
}


return (
    <div>
        <div>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">
                Home   
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>


        <Link className="btn btn-secondary"  to={`/decks/${deckId}/edit`}>Edit</Link>
        <Link className="btn btn-primary"  to={`/decks/${deckId}/study`}>Study</Link>
        <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>+ Add Cards</Link>
        <button className="btn btn-danger" type="button"
        onClick={() => deleteThisDeck(deck.id)}>
        Delete
        </button>

        <div>
            <h2>Cards</h2>
            
            {deck.cards.map((card) => (
                <div className="card" key={card.id}>
                <div className="card-body">
                  <div className="row-card-body">
                  <p className="card-text">{card.front}</p>
                  <p className="card-text">{card.back}</p>
                  </div>
                  <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
                  <button className="btn btn-danger" type="button" onClick={() => deleteThisCard(card.id)}>
                        Delete
                    </button>
                </div>
              </div>
            ))}
        
        </div>
      </div>


    </div>
);
}

export default Deck;