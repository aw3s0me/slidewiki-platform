import {BaseStore} from 'fluxible/addons';

class SemanticSearchStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.results = [];
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
