import React from 'react';

/**
 * Created by korovin on 3/23/2017.
 */
export default class ObjectInput extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    render() {
        return (
            <div className="ui labeled input">
                <div className="ui label">
                    http://
                </div>
                <input type="text" placeholder={ this.props.prop.range? this.props.prop.range: '' } onChange={ this.props.onChange } />
            </div>)
    }
}
