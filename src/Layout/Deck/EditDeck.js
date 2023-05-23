import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

function EditDeck() {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const { deckId } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState(deck.description);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const getDeckFromAPI = await readDeck(deckId, abortController.signal);
      setDeck(getDeckFromAPI);
      setDescription(getDeckFromAPI.description);
      setName(getDeckFromAPI.name);
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    const currentDeck = { ...deck, name, description };
    updateDeck(currentDeck).then((response) => {
      setDeck(response);
      history.push(`/decks/${deck.id}`);
    });
  };

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
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">
                Edit Deck
            </li>
          </ul>
        </nav>
      </div>
      <h2>Edit Deck</h2>
      <div>
      <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="name">Name</label>
                <input id="name" 
                className="form-control"
                type="text" 
                name="name" 
                onChange={handleNameChange} 
                value={name} />
            </div>
            <div className="form-group">
                <label className="exampleFormControlTextarea1" >Description</label>
                <input id="exampleFormControlTextarea1" 
                type="textarea" 
                className="form-control"
                name="description" 
                rows="3"
                onChange={handleDescriptionChange}
                value={description} />
            </div>
            <div>
                <button type="button" onClick={() => history.push(`/decks/${deck.id}`)}>Cancel</button>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            </form>
      </div>
    </div>
  );
}

export default EditDeck;
