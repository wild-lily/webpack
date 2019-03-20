import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader';
import App from './pages/Index/index';

function Index() {
    return (
        <div className='container'>
            <App />
        </div>
    );
}

ReactDOM.render(<Index />, document.getElementById('app'));

export default hot(module)(Index);
