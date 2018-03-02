import React, {Component} from 'react';

export default class KeywordField extends Component {
    componentDidMount() {
        $(this._select).dropdown();
        // TODO: load suggestions from tag service
    }
    render() {
        return (
            <div className="ui container">
                <div className="ui content">
                    <h3 className="ui header">Keyword</h3>
                    <select ref={select => this._select = select } className="ui fluid search dropdown" multiple="">
                        <option value="" className="value">Tag</option>
                    </select>
                </div>
            </div>
        )
    }
}
