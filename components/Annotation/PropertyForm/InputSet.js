import React from 'react';
import AnnotationStore from "../../../stores/AnnotationStore";
import { connectToStores } from 'fluxible-addons-react';
import ObjectInput from './inputs/ObjectInput';
import YearInput from './inputs/YearInput';
import DateInput from './inputs/DateInput';
import StringInput from './inputs/StringInput';
import PropertyHelper from "../../../actions/annotations/utils/PropertyHelper";

/**
 * Created by korovin on 3/23/2017.
 */
class InputSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: ''
        }
    }
    initInput() {
        const { curPropType } = this.props.AnnotationStore;
        if (!curPropType) {
            return <div className="ui labeled input disabled">
                    <input type="text" placeholder="Please choose property first" />
                </div>;
        }

        if (curPropType.type === PropertyHelper.OBJECT_TYPE_VAL) {
            return <ObjectInput prop={ curPropType } onChange={ this.props.onChange } />
        } else if (curPropType.type === PropertyHelper.DATATYPE_TYPE_VAL) {
            switch (curPropType.range) {
                case 'date':
                    return <DateInput prop={ curPropType } onChange={ this.props.onCalendarChange } />;
                    break;
                case 'gYear':
                    return <YearInput prop={ curPropType } onChange={ this.props.onCalendarChange } />;
                    break;
                default:
                    return <StringInput prop={ curPropType } onChange={ this.props.onChange } />;
            }
        } else {
            return <StringInput prop={ curPropType } onChange={ this.props.onChange } />;
        }
    }
    render() {
        return <div className="field">
            <label htmlFor="">Add value: </label>
            { this.initInput() }
        </div>
    }
}

InputSet.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

InputSet = connectToStores(InputSet, [AnnotationStore], (context, props) => {
    return {
        AnnotationStore: context.getStore(AnnotationStore).getState()
    };
});

export default InputSet;
