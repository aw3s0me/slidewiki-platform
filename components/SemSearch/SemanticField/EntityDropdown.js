import React, {Component} from 'react';
import getDbpediaClasses from "../../../actions/annotations/getDbpediaClasses";
import AnnotationStore from '../../../stores/AnnotationStore';
import { connectToStores } from 'fluxible-addons-react';
import getClassPropertiesDbpedia from "../../../actions/annotations/getClassPropertiesDbpedia";

class EntityDropdown extends Component {
    componentDidMount() {
        $(this._select).dropdown({
            onChange: (value, text, $selectedItem) => this.onChange(value, text, $selectedItem)
        });

        this.context.executeAction(getDbpediaClasses);
    }
    onChange(value, text, $selectedItem) {
        const uri = $selectedItem.attr('value');
        if (this.props.entity !== uri) {
            this.props.onChangeEntity(uri);
            this.context.executeAction(getClassPropertiesDbpedia, {
                type: uri
            });
        }
    }
    getEntities(dbpediaClasses) {
        if (!dbpediaClasses.length) {
            return;
        }
        $(this._select).removeClass('loading');

        return dbpediaClasses.map(dClass => {
            return <div value={dClass.uri} key={dClass.uri} className="item">
                {dClass.label}
            </div>;
        });
    }
    render() {
        let { dbpediaClasses } = this.props.AnnotationStore;
        return (
            <div className="field">
                <label htmlFor="entity">Entity type</label>
                <div ref={select => this._select = select } className="ui fluid search selection dropdown loading">
                    <i className="dropdown icon" />
                    <div className="text">Select Entity type</div>
                    <div className="menu">
                        { this.getEntities(dbpediaClasses) }
                    </div>
                </div>
            </div>
        )
    }
}

EntityDropdown.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

EntityDropdown = connectToStores(EntityDropdown, [AnnotationStore], (context, props) => {
    return {
        AnnotationStore: context.getStore(AnnotationStore).getState()
    }
});

export default EntityDropdown;
