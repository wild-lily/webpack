
import {observable, action, computed} from 'mobx';

export default class State {
    @observable
    state = {
        title: 'Header..'
    };

    @computed
    get getHeader() {
        return `${this.state.title} + zhangfuling`;
    }

    @action
    setTitle() {
        if (Math.random() > 0.5) {
            this.state.title += '.';
        } else {
            const title = this.state.title;
            if (title[title.length - 1] !== '.') {
                return;
            }
            this.state.title = title.substring(title.length - 1, 0);
        }
    }
}
