import React, {Component} from 'react';
import {observer} from 'mobx-react';
import State from './state';
import style from './style.less';
import Button from '../../components/Button/index';
@observer
class Detail extends Component {
    local = {
        state: new State()
    };
    render() {
        return (
            <div className={style.box}>
                <h1>{this.local.state.getHeader}</h1>
                <Button type='default' onClick={() => {
                    this.local.state.setTitle();
                }} word='default'></Button>
            </div >
        );
    }
}

export default Detail;
