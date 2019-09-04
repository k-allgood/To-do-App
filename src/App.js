import React, { Component, Fragment } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import AddItem from "./components/AddItem";
import axios from "axios";
import uuid from "uuid";

class App extends Component {
  state = {
    allItems: []
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(response => {
        this.setState({
          allItems: response.data
        });
      });
  }

  //Toggle completed
  strikeThrough = id => {
    this.setState({
      allItems: this.state.allItems.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  //Add Item
  addItem = title => {
    const newItem = {
      title: title,
      id: uuid.v4(),
      completed: false
    };
    this.setState({
      allItems: [...this.state.allItems, newItem]
    });
  };

  //Delete Item
  deleteItem = id => {
    this.setState({
      allItems: [...this.state.allItems.filter(todo => todo.id !== id)]
    });
  };

  render() {
    return (
      <Fragment>
        <p>A simple and fast to-do list made with React and CSS.</p>
        <div className="app">
          <AddItem addItem={this.addItem} />
          <TodoList
            allItems={this.state.allItems}
            strikeThrough={this.strikeThrough}
            deleteItem={this.deleteItem}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
