import React from 'react';

/**
 * Created by korovin on 3/23/2017.
 */
export default class DateInput extends React.Component {
    componentDidMount() {
        // init calendar
        $(this._inp).calendar({
            type: 'date',
            onChange: (date, text, mode) => this.props.onChange(date, text, mode)
        });
    }
    render() {
        return (
            <div className="ui calendar" ref={inp => this._inp = inp }>
                <div className="ui input left icon">
                    <i className="calendar icon" />
                    <input type="text" placeholder="Date" />
                </div>
            </div>)
    }
}
