import React from 'react';
import {connect} from 'react-redux'

function App({ insc, insync, count }) {
  return (
    <div className="app">
      <h1>Demo 1</h1>
      <p>{count}</p>
      <span onClick={insc}>click</span>
      <br />
      <span onClick={insync}>click sync</span>
    </div>
  );
}

function mapState(state) {
  return {
    count: state.count,
  }
}

function mapDispatch(dispatch) {
  return {
    insc: () => {dispatch({type: 'In',payload: 5})},
    insync: () => {dispatch({type: 'In_Async'})},
  }
}

export default connect(mapState, mapDispatch)(App);
