import React from 'react'
import Todo from "./Todo"

export default class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.data.map(element => {
          return (<Todo key={element.id} data={element} toggleClick={this.props.toggleClick}/>)
        })}
      </ul>
    )
  }
}
