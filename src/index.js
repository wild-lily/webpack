import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader';
import BasicRoute from './pages/router';

function Index() {
    return (
        <div className='container'>
            <BasicRoute />
        </div>
    );
}

ReactDOM.render(<Index />, document.getElementById('app'));

export default hot(module)(Index);
