import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/index';

// todo: 为什么使用 jq 的 ajax 方法，并没有引入 jq
$.get('/api/config/list', {}, data => {
    console.log(data, 'DATA');
});

$.get('/api/user', {}, data => {
    console.log('/api/user', data);
});

function Index() {
    return (
        <div className="container">
            <App />
        </div>
    );
}
ReactDOM.render(<Index />, document.getElementById('app'));

export default Index;
if (module.hot) {
    // 检测是否有模块热更新
    module.hot.accept('./App/index.js', () => {
        // 针对被更新的模块, 进行进一步操作
        console.log('/App/index.js is changed');
    });
}
