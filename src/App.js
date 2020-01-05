import React, { Component } from 'react';
import List from './List';
import STORE from './STORE';
import './App.css';

class App extends Component {
  // static defaultProps = {
  //   store: {
  //     lists: [],
  //     allCards: {},
  //   }
  // };

  state = {
    allCards: STORE.allCards,
    lists: STORE.lists
  };

  handleDeleteCard=(card)=>{
    this.setState({
      allCards:this.omit(this.state.allCards, card.id),
      lists:this.state.lists.map(list=>({
        ...list,
        cardIds: list.cardIds.filter(cardID => cardID !== card.id)
      }))
    })
  };

  handleAddRandom=(targetList)=>{
    //console.log('Add Random called', {list});
    const newCard = this.newRandomCard();
    const newCardIds = targetList.cardIds.slice();
    newCardIds.push(newCard.id);

    const newLists = this.state.lists.map(list=>{
      if(list.id===targetList.id) {
        list.cardIds = newCardIds
      }
      return list;
    })

    const card ={};
    card[newCard.id] = newCard;

    const newAllCards = Object.assign({},
      this.state.allCards, card);

    this.setState({
      allCards: newAllCards,
      lists: newLists
    });
    
  };

  omit=(obj, keyToOmit)=> {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
          key === keyToOmit ? newObj : {...newObj, [key]: value},
      {}
    );
  }

  newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }

  render() {
    //const { store } = this.state.STORE
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.lists.map(list => (
            <List
              key={list.id}
              list={list}
              header={list.header}
              cards={list.cardIds.map(id => this.state.allCards[id])}
              onDeleteCard={this.handleDeleteCard}
              onRandomCard={this.handleAddRandom}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
