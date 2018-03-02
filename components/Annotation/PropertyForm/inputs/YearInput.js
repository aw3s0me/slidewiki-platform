import React from 'react';

/**
 * Created by korovin on 3/23/2017.
 */
export default class YearInput extends React.Component {
    componentDidMount() {
        // init calendar
        $(this._inp).calendar({
            type: 'year',
            onChange: (date, text, mode) => this.props.onChange(date, text, mode)
        });
    }
    render() {
        return (
            <div className="ui calendar" ref={inp => this._inp = inp }>
                <div className="ui input left icon">
                    <i className="time icon" />
                    <input type="text" placeholder="Time" />
                </div>
            </div>)
    }
}
