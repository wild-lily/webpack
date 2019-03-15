import {
    observable,
    action,
    computed
} from 'mobx';

export default class State {
    @observable
    state = {
        title: 'Header..'
    }

    @computed
    get get_header() {
        return this.state.title + 'zhangfuling';
    }

    @action
    set_title() {
        if (Math.random() > 0.5) {
            this.state.title += '.'
        } else {
            let title = this.state.title
            if (title[title.length - 1] !== '.') return;
            this.state.title = title.substring(title.length - 1, 0);
        }
    }
}