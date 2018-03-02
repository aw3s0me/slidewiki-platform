import React, {Component} from 'react';

export default class SemanticSearchEntry extends Component {
    render() {
        const result = this.props.data;

        return (
            <div className="accordionItem">
                <div className="title">
                    <div className="ui middle aligned centered grid">
                        <div className="row">
                            <div className="twelve wide column">
                                <div className="ui grid">
                                    <div className="sixteen wide left aligned column">
                                        <div className="row">
                                            <h3><a href={result.link}>{result.title}</a></h3>
                                        </div>
                                        <div className="row">
                                            <b>Description: </b>{result.description}
                                        </div>
                                        <div className="row">
                                            <b>{result.kind} last modified:</b> {result.lastUpdate}
                                        </div>
                                        <div className="row">
                                            <span><b>Owner:</b> <a href={result.user.link}>{result.user.username}</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="four wide column">
                                <button className="ui small button">See slide results</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="ui centered grid">
                        <div className="fourteen wide left aligned column">
                            <h2>Slides where annotations</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
