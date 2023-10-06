import React from 'react'
import axios from 'axios'
import TodoList from './TodoList'
import Form from './Form'
import Todo from './Todo'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor(){
    super();
    this.state ={
      todos: [],
      error: {
        message: "",
        status: false
      },
      todoNameInput: ""
    }
  }

handleClearButton = () => {
  this.setState({
    ...this.state,
    todos: this.state.todos.filter(element => {
      return (element.completed === false)
    })
  })
}

toggleClick = (id) => {
  axios.patch( `${URL}/${id}`)
  .then(res => {
    this.setState({
      ...this.state, todos: this.state.todos.map(element => {
        if (element.id !== id) return element
        return res.data.data
      })
    })
  })
  .catch(this.setAxiosResponseError)
}

onChangeTodoInput = (event) => {
  const { value } = event.target
  this.setState({
    ...this.state,
    todoNameInput: value
  })
}

setAxiosResponseError = err => this.setState({
  ...this.state, error: {
    message: err.response.data.message,
    status: true
  }
})

fetchAllTodos = () => {
  axios.get(URL)
  .then(res => {
    this.setState({
      ...this.state, todos: res.data.data, error: {}
    })
  })
  .catch(this.setAxiosResponseError)
}

resetForm = () => {
  this.setState({
    ...this.state,
    todoNameInput: ""
  })
}

postNewTodo = () => {
  axios.post(URL, {name: this.state.todoNameInput})
  .then(res => {
    this.setState({
      ...this.state,
      todos: this.state.todos.concat(res.data.data),
      error: {
        message: "",
        status: false
      }
    })
    this.resetForm();
  })
  .catch(this.setAxiosResponseError)
}

onSubmitTodo = (event) => {
  event.preventDefault();
  this.postNewTodo();
}
componentDidMount(){
  this.fetchAllTodos();
}

  render() {
    const { todos } = this.state;
    return (
      <div>
      {this.state.error.status? <div id="error">Error: {this.state.error.message}</div>: <></>}
      <h2>Todos:</h2>
      <TodoList data={todos} toggleClick={this.toggleClick}/>
      <Form> todoInput={this.state.todoNameInput} onChangeTodoInput={this.onChangeTodoInput} onSubmitTodo={this.onSubmitTodo} handleClearButton={this.handleClearButton} </Form>
      </div>
    )
  }
}
