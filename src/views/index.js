import React, { Component } from 'react'

class FormContainer extends Component {
  handleClick = e => {
    console.log('hello')
  }
  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleClick}>himashu</button>
        <div className='parent'>
          <p> para 1</p>
          <p> para 2</p>
          <p> para 3</p>
          <p> para 4</p>
          <p> para 5</p>
        </div>
      </React.Fragment>
    )
  }
}

export default FormContainer
