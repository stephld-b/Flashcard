import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

function CardList({ cards }){
    const history = useHistory();
    const { deckId } = useParams();
    const [frontSide, setFrontSide] = useState(true);
    let [card, setCard] = useState(0);
    

    const handleFlip = () => {
        setFrontSide(() => !frontSide);
    };

    function handleNext() {
        
        if(card + 1 === cards.length){
            const result = window.confirm("Restart cards? CLick 'cancel' to return to the home page.");
            if(result === true){
                setCard(0);
            } else {
                history.push("/");
            }
        } else {
            setCard(card + 1);
            setFrontSide(() => !frontSide);
        }
    }

    if(!cards){
        return null;
    } else if(cards.length > 2){
        const flip = (<button className="btn btn-secondary" onClick={handleFlip}>Flip</button>)
        const next =(<button className="btn btn-primary" onClick={handleNext}>Next</button>)
        return (
            <ul className="deck-cards">
                {cards && (
                    <li>
                    <div className="card" key={cards[card].id}>
                    <div className="card-body">
                      <h5 className="card-title">Card {card + 1} of {cards.length}</h5>
                      <p className="card-text">{frontSide ? cards[card].front : cards[card].back}</p>
                      {frontSide ? flip : next}
                    </div>
                  </div>
                  </li>
                )}
            </ul>
        );
    } else {
        return (
            <div>
                <h3>Not enough cards</h3>
                <p>You need at least 3 cards to study this deck. 
                    There are currently {cards ? cards.length : 0} cards in this deck.</p>
                <Link className="btn btn-primary ml-3" to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
            </div>
        );
    }
}

export default CardList;