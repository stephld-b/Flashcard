import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api/index";

function AddCard({refresh}) {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();
  const [front, setFront] = useState("Front side of card");
  const [back, setBack] = useState("Back side of card");

  useEffect(() => {
    async function loadDeck() {
      const getDeckFromAPI = await readDeck(deckId);
      setDeck(getDeckFromAPI);
    }
    loadDeck();
  }, [deckId]);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    const card = { front: front, back: back, deckId: deckId };
    async function updateCard() {
      await createCard(deckId, card);
    }
    updateCard();
    setFront("Front side of card");
    setBack("Back side of card");
    refresh();
    history.push(`/decks/${deck.id}`);
  };

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
            <li className="breadcrumb-item">
              <a href="/">{deck.name}</a>
              </li>
            <li className="breadcrumb-item active" aria-current="page">Add Card</li>
          </ul>
        </nav>
      </div>
      <h2>{deck.name}: Add Card</h2>
      <div >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="name">Front</label>
            <textarea
            className="form-control"
              id="front"
              type="textarea"
              name="front"
              required
              rows="3"
              onChange={handleFrontChange}
              value={front}
            ></textarea>
          </div>
          <div className="form-group">
            <label className="exampleFormControlTextarea1" >Back</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1" 
              type="textarea"
              name="back"
              required
              rows="3"
              onChange={handleBackChange}
              value={back}
            ></textarea>
          </div>
          <div>
            <button className="btn btn-secondary" type="button" 
            onClick={() => history.push("/")}>
              Done
            </button>
            <button className="btn btn-primary" type="submit" 
            onClick={handleSubmit}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCard;
