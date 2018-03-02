import React, {Component} from 'react';
import SemanticField from './SemanticField/SemanticField';
import KeywordField from './KeywordField';
import RadioboxSearchType from './RadioboxSearchType';
import SemanticSearchResultsPanel from './SearchResults/SemanticSearchResultsPanel';
import KeywordsInput from '../Search/AutocompleteComponents/KeywordsInput';
import doSemSearch from "../../actions/semsearch/doSemSearch";

const KEYWORD_FIELD_TYPE = 'keyword';
const SEMANTIC_FIELD_TYPE = 'semantic';
const HYBRID_FIELD_TYPE = 'hybrid';

class SemSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: HYBRID_FIELD_TYPE,
            keywords: ''
        }
    }
    componentDidMount() {
        $(this._keywordCont).show();
        $(this._semCont).show();
    }
    onSearch(e) {
        e.preventDefault();
        if (!this.state.type) {
            return;
        }

        this.context.executeAction(doSemSearch, {
            type: this.state.type,
            keywords: this.state.keywords,
            semantic: this.refs.semantics.state
        });
    }
    onTypeChange(newType) {
        const { type } = this.state;
        if (newType === type) {
            return;
        } else {
            this.setState({ type: newType });
        }

        if (newType === KEYWORD_FIELD_TYPE) {
            $(this._keywordCont).show();
            $(this._semCont).hide();
        } else if (newType === SEMANTIC_FIELD_TYPE) {
            $(this._keywordCont).hide();
            $(this._semCont).show();
        } else if (newType === HYBRID_FIELD_TYPE) {
            $(this._keywordCont).show();
            $(this._semCont).show();
        }
    }
    onSelect(searchstring){
        this.setState({keywords: searchstring});
    }
    clearInput(){
        this.setState({keywords: ''});
        this.refs.keywords.focus();
    }
    onChange(e) {
        this.setState({keywords: e.target.value});
    }
    onKeyPress(e) {
        console.log(e.target.value);
    }
    render() {
        return (
            <div className="ui container">
                <div className="ui content">
                    <h2 className="ui header" style={{marginTop: '1em'}}>
                        Semantic Search
                    </h2>
                    <RadioboxSearchType type={this.state.type} onChange={this.onTypeChange.bind(this)} />
                    <div ref={ keywordCont => this._keywordCont = keywordCont }>
                        <form className="ui form success">
                            <div className="field">
                                <KeywordsInput ref="keywords"
                                               onSelect={this.onSelect.bind(this)}
                                               onChange={this.onChange.bind(this)}
                                               onKeyPress={this.onKeyPress.bind(this)}
                                               value={decodeURIComponent(this.state.keywords)}
                                               placeholder='Type your keywords here'
                                               clearInputHandler={this.clearInput.bind(this)} />
                            </div>
                        </form>
                    </div>
                    <div ref={ semCont => this._semCont = semCont }>
                        <SemanticField ref="semantics" />
                    </div>
                    <button className="ui primary button" onClick={this.onSearch.bind(this)} style={{marginTop: '1em'}}>Search</button>
                    <div className="ui divider"></div>
                    <SemanticSearchResultsPanel />
                </div>
            </div>
        )
    }
}

SemSearch.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

export default SemSearch;
