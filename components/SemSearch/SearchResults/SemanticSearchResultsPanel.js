import React, {Component} from 'react';
import SemanticSearchStore from '../../../stores/SemanticSearchStore';
import { connectToStores } from 'fluxible-addons-react';
import SemanticSearchResultsList from './SemanticSearchResultsList';

class SemanticSearchResultsPanel extends Component {
    render() {
        let { results } = this.props.SemanticSearchStore;
        return (
            <div className="ui container">
                <div className="ui content">
                    <h2 className="ui header" style={{marginTop: '1em'}}>Search Results</h2>
                    { results.length? <div className="ui centered grid">
                        <div className="twelve wide column">
                            <SemanticSearchResultsList items={ results } />
                        </div>
                    </div> : 'No results found' }
                </div>
            </div>
        )
    }
}

SemanticSearchResultsPanel.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

SemanticSearchResultsPanel = connectToStores(SemanticSearchResultsPanel, [SemanticSearchStore], (context, props) => {
    return {
        SemanticSearchStore: context.getStore(SemanticSearchStore).getState()
    }
});

export default SemanticSearchResultsPanel;
