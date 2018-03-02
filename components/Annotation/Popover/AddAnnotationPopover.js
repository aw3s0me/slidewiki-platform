import React, {Component} from 'react';
import Modal from 'react-modal';
import removeUriSuggestions from "../../../actions/annotations/removeUriSuggestions";
import EntityTypeForm from '../EntityTypeForm';
import AnnotationStore from '../../../stores/AnnotationStore';
import { connectToStores } from 'fluxible-addons-react';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        zIndex                : 15,
        width                 : '450px'
    }
};

class AddAnnotationPopover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
    }
    handleAnnotate(e, data) {
        e.preventDefault();
        this.setState({type: data.type});
        this.context.executeAction(removeUriSuggestions);
        this.openModal();
    }
    openModal() {
        let {ranges} = this.props.AnnotationStore;
        if (!ranges || !ranges.length) {
            alert('Please select text');
            return;
        }

        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    render() {
        return (
            <div className="ui icon buttons">
                <Modal
                    isOpen={ this.state.modalIsOpen }
                    onRequestClose={ this.closeModal.bind(this) }
                    style={ customStyles }
                    contentLabel="Add Entity">
                    <EntityTypeForm type={ this.state.type } mode={ 'add' } onClose={ this.closeModal } />
                </Modal>
                <button className="positive ui right labeled icon button" onClick={this.handleAnnotate.bind(this)}>
                    <i className="plus icon" />Annotate
                </button>
            </div>
        )
    }
}

AddAnnotationPopover.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

AddAnnotationPopover = connectToStores(AddAnnotationPopover, [AnnotationStore], (context, props) => {
    return {
        AnnotationStore: context.getStore(AnnotationStore).getState()
    };
});

export default AddAnnotationPopover;
