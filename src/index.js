import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './components/app-header';
import SearchPanel from './components/search-panel';
import TodoList from './components/todo-list';
import ItemStatusFilter from './components/item-status-filter';
import AddItem from './components/add-item';

import './index.css';

export default class App extends Component {
  
  maxId = 100;

  state = { todoData: [
    this.createTodoItem('Drink Coffee'),
    this.createTodoItem('Make Awesome App'),
    this.createTodoItem('Have a lunch')
    ]
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState( ({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];
      return {
        todoData: newArray
      };
    });
  };

  addItemFunc = (text) => {
    this.setState(({todoData}) => {
      const newArray = [...todoData, this.createTodoItem(text)];
      return {
        todoData: newArray
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]}

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {      
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length,
          moreTodo = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={moreTodo} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
        todos={todoData}
        onDeleted={ this.deleteItem }
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone} />
        <AddItem 
        onItemAdded={ this.addItemFunc }/>
      </div>
    );
  }  
};

ReactDOM.render(<App />,
  document.getElementById('root'));