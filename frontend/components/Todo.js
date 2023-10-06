import React from 'react'

export default class Todo extends React.Component {

  handleClick = () => {
    this.props.toggleClick(this.props.data.id)
  }

  render() {
    return (
      <li onClick={this.handleClick}>{this.props.data.name}{this.props.data.completed? "✔" : ""}</li>
    )
  }
}
