import React from 'react';

/**
 * Created by korovin on 3/23/2017.
 */
export default class ObjectInput extends React.Component {
    render() {
        return <div className="ui labeled input">
            <input type="text" placeholder={ this.props.prop.range? this.props.prop.range: '' } onChange={ this.props.onChange } />
        </div>
    }
}
