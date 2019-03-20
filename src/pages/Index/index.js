import React, {Component} from 'react';
import {observer} from 'mobx-react';
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
                <h1>{this.local.state.getHeader}</h1>
                <button onClick={() => {
                    this.local.state.setTitle();
                }}>
                    change
                </button>
            </div>
        );
    }
}

export default App;
