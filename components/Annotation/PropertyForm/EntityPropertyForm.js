import React from 'react';
import PropertyDropdown from './PropertyDropdown';
import InputSet from './InputSet';
import addProperty from "../../../actions/annotations/addProperty";

/**
 * Created by korovin on 3/22/2017.
 */
class EntityPropertyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            value: ''
        }
    }
    onAddProperty(e) {
        e.preventDefault();
        let { value } = this.state;
        if (!value) {
            alert('value is empty');
            return;
        }

        this.context.executeAction(addProperty, {
            value: value,
            chosen: this.props.chosen
        });

        this.props.closeModal();
        // TODO: get all properties from store
    }
    handleValueChange(e) {
        e.preventDefault();
        this.setState({ value: e.target.value });
    }
    handleValueCalendarChange(date, text, mode) {
        this.setState({ value: date });
    }
    render() {
        return (
            <div className="ui container" style={ { height: '100%' } }>
                <div className="ui grid" style={ { height: '100%' } }>
                    <div className="sixteen wide column stretched">
                        <div className="ui form">
                            <h4 className="ui dividing header">{ this.props.type }</h4>
                            <div className="field">
                                <label htmlFor="">Choose property: </label>
                                <PropertyDropdown type={ this.props.type } />
                            </div>
                            <InputSet onChange={ this.handleValueChange.bind(this) }
                                      onCalendarChange={ this.handleValueCalendarChange.bind(this) }/>
                        </div>
                        <div className="field" style={{ marginTop: '130px' }}>
                            <button className="ui primary button" onClick={this.onAddProperty.bind(this)}>Add</button>
                            <button className="ui red button" onClick={this.props.closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EntityPropertyForm.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

export default EntityPropertyForm;
