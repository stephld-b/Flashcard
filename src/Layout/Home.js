import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeckList from "./Deck/DeckList";

function Home(){
    return(
        <div>
          <Link className="btn btn-secondary" to="/decks/new"> <span className="oi oi-plus" /> Create Deck</Link>
          <DeckList />
        </div>
    );
}

export default Home;