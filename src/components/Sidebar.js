import React, { Component } from 'react'

class Sidebar extends Component {

  componentDidMount() {

  }

  onChange(event) {
    console.log('fwjeofjaowe')
    this.value = event.target.value;
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

// JSON.stringify(this.props.data, null, 2)
/*
        <form className="ui form" onSubmit={ this.onChange }>
          <textarea
            value={ JSON.stringify(this.props.data, null, 2) }
            onChange={ this.onChange.bind(this) }
          />
        </form>

 */