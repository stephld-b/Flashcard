import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./Deck/CreateDeck";
import Deck from "./Deck/Deck";
import EditDeck from "./Deck/EditDeck";
import Study from "./Deck/Study";
import AddCard from "./Card/AddCard";
import EditCard from "./Card/EditCard";

function Layout() {
  const [ refreshKey, setRefreshKey ] = useState(0); 
  function refresh(){
    setRefreshKey(refreshKey + 1);
  }


  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here ADD nested routes or all possible routes /decks/:deckId /decks/{subpaths} */}
        <Switch>
          
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard refresh={refresh} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
