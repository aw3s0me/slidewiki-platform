import React, {Component} from 'react';

export default class ExistingAnnotationPopover extends Component {
    render() {
        return (
            <div className="ui icon buttons">
                <button className="ui yellow button"><i className="edit icon" /></button>
                <button className="ui red button"><i className="remove icon" /></button>
                <button className="ui blue button"><i className="info icon" /></button>
                <button className="ui teal button"><i className="talk icon" /></button>
            </div>
        )
    }
}
