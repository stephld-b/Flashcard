import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

function CreateDeck() {
  const history = useHistory();
  const [newDeck, setNewDeck] = useState({ name:"", description:""});

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await createDeck(newDeck);
    history.push(`/decks/${response.id}`);
  }

  const handleChange = (event) => {
    setNewDeck({ ...newDeck, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a className="nav-link home" href="/">
                Home
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
               Create Deck
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="name">Name</label>
                <input id="name" 
                type="text" 
                name="name" 
                placeholder="Deck Name" 
                onChange={handleChange} 
                value={newDeck.name} />
            </div>
            <div className="form-group">
                <label className="decription">Description</label>
                <textarea id="description" 
                type="textarea" 
                name="description" 
                placeholder="Brief description of the deck"
                rows="3"
                onChange={handleChange}
                value={newDeck.description} ></textarea>
            </div>
            <div>
                <button className="btn btn-secondary" type="button" 
                onClick={() => history.push("/")}>Cancel</button>
                <button className="btn btn-primary" type="submit" 
                onClick={handleSubmit}>Submit</button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDeck;
