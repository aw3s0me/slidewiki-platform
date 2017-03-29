import {BaseStore} from 'fluxible/addons';

const test = {
    link: 'http://uri.com',
    title: 'My_deck',
    description: 'Description',
    kind: 'Deck',
    lastModified: '2018',
    user: {
        link: 'http://uri.com/user/1',
        username: 'alex'
    }
};

class SemanticSearchStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.results = [];
        this.results.push(test);
        this.results.push(test);
    }
    initResults(results) {
        this.results = results;
        this.emitChange();
    }
    getState() {
        return {
            results: this.results
        };
    }
    dehydrate() {
        return this.getState();
    }
    rehydrate(state) {
        this.results = state.results;
    }
}

SemanticSearchStore.storeName = 'SemanticSearchStore';
SemanticSearchStore.handlers = {
    'INIT_SEMSEARCH_RESULTS': 'initResults'
};

export default SemanticSearchStore;
