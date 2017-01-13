import React, { Component } from 'react'

class Sidebar extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div id="sidebar">
        <pre>{ JSON.stringify(this.props.data, null, 2) }</pre>
      </div>
    )
  }

}

export default Sidebar
