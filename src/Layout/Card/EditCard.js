import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateCard } from "../../utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({});
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    async function loadAll() {
        try{
      const getAllInfoFromAPI = await readDeck(deckId, abortController.signal);
      setDeck(getAllInfoFromAPI);
      setCard(getAllInfoFromAPI.cards.find((card) => card.id + "" === cardId));
      setFront(getAllInfoFromAPI.cards.find((card) => card.id + "" === cardId).front);
      setBack(getAllInfoFromAPI.cards.find((card) => card.id + "" === cardId).back);
        } catch (error) {
            console.log(error);
        }
    }
    loadAll();
    return () => abortController.abort();
  }, [deckId, cardId]);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    const cardEdit = { ...card, front, back };
    updateCard(cardEdit).then((response) => {
      setCard(response);
      history.push(`/decks/${deckId}`);
    });
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
            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
            <li>
                Edit Card
            </li>
          </ul>
        </nav>
      </div>
      <h2>Edit Card</h2>
      <div>
      <CardForm 
        front={front} 
        back={back} 
        handleSubmit={handleSubmit} 
        setFront={setFront}
        setBack={setBack}/>
      </div>
    </div>
  );
}

export default EditCard;
