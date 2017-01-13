import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import _ from 'lodash'
import moment from 'moment'

import Sidebar from './Sidebar'
import Canvas from './Canvas'

class App extends Component {

  componentDidMount() {
    window.app = this
    window.moment = moment
    window._ = _

    $.ajax({
      method: 'GET',
      url: '/data/radial.json',
      dataType: 'json',
      contentType: 'application/json'
    })
    .done((data) => {
      this.props.store.dispatch(actions.updateData(data))
    })
  }

  render() {
    return (
      <div>
        <Sidebar store={ this.props.store }
                data={ this.props.data }
                app={ this }
                actions={ this.props.actions } />
        <Canvas store={ this.props.store }
                data={ this.props.data }
                app={ this }
                actions={ this.props.actions } />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)