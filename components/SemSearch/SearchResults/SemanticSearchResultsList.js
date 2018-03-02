import React, {Component} from 'react';
import SemanticSearchEntry from './SemanticSearchEntry';

export default class SemanticSearchResultsList extends React.Component {
    initAccordion(){
        $('.ui.accordion').accordion({
            selector: {
                trigger: '.title .button'
            }
        });
    }
    componentDidMount(){
        this.initAccordion();
    }
    componentDidUpdate(){
        this.initAccordion();
    }
    render() {
        let list = this.props.items.map((node, index) => {
            return (
                <SemanticSearchEntry key={index} data={node} />
            );
        });
        return (
            <div className="ui accordion fluid">
                {list}
            </div>
        );
    }
}
