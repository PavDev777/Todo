import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form'
import TodoList from './components/TodoList';


function App() {




  const [inputText, setInputText] = useState("")
  const [Todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])

  useEffect(() => {
    getLocalTodos()
  }, [])

  useEffect(() => {
    filterHandler()
    saveLocalTodos()
  }, [Todos, status])

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(Todos.filter(todo => todo.completed === true))
        break
      case 'uncompleted':
        setFilteredTodos(Todos.filter(todo => todo.completed === false))
        break
      default:
        setFilteredTodos(Todos)
    }
  }

  const saveLocalTodos = () => {
    localStorage.setItem('Todos', JSON.stringify(Todos))
  }
  const getLocalTodos = () => {
    if (localStorage.getItem('Todos') === null) {
      localStorage.setItem('Todos', JSON.stringify([]))
    } else {
      let todolocal = JSON.parse(localStorage.getItem('Todos'))
      setTodos(todolocal)
    }
  }


  return (
    <div className="App">
      <header>
        <h1>Ed's ToDo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={Todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={Todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
