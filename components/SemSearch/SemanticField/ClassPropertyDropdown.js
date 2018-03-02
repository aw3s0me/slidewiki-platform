import React, {Component} from 'react';
import AnnotationStore from '../../../stores/AnnotationStore';
import { connectToStores } from 'fluxible-addons-react';

class ClassPropertyDropdown extends Component {
    componentDidMount() {
        $(this._propSelect).dropdown({
            onChange: (value, text, $selectedItem) => this.onPropChange(value, text, $selectedItem)
        });
    }
    getProperties(curClassProps) {
        if (!curClassProps.length) {
            return;
        }
        $(this._propSelect).removeClass('loading');

        return curClassProps.map(dClass => {
            return <div value={dClass.uri} key={dClass.uri} className="item">
                {dClass.label}
            </div>;
        });
    }
    onPropChange(value, text, $selectedItem) {
        if (!$selectedItem) {
            return;
        }

        const uri = $selectedItem.attr('value');

        if (this.props.prop === uri) {
            return;
        }
        
        this.props.onChangeProp(uri);
        // TODO: process uri
    }
    render() {
        let { curClassProps } = this.props.AnnotationStore;
        return (
            <div className="field">
                <label htmlFor="property">Property type</label>
                <div ref={propSelect => this._propSelect = propSelect } className="ui fluid search selection dropdown loading">
                    <i className="dropdown icon" />
                    <div className="text">Select Property</div>
                    <div className="menu">
                        { this.getProperties(curClassProps) }
                    </div>
                </div>
            </div>
        )
    }
}

ClassPropertyDropdown.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

ClassPropertyDropdown = connectToStores(ClassPropertyDropdown, [AnnotationStore], (context, props) => {
    return {
        AnnotationStore: context.getStore(AnnotationStore).getState()
    }
});

export default ClassPropertyDropdown;

