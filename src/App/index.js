import React, { Component } from 'react';
import { observer } from 'mobx-react';
import State from './state';
import style from './style.less';
@observer
class App extends Component {
  local = {
    state: new State()
  };
  render() {
    return (
      <div className={style.box}>
        <button>
          <h1>{this.local.state.get_header}</h1>
          <button
            onClick={() => {this.local.state.set_title()}}>change</button>
        </button>
      </div>
    );
  }
}

export default App;
