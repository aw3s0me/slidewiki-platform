import React from 'react';
import { MenuItem } from 'react-contextmenu';
import Modal from 'react-modal';
import EntityPropertyForm from './PropertyForm/EntityPropertyForm';
import Annotation from "../../actions/annotations/classes/Annotation";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        zIndex                : 15,
        width                 : '450px',
        height                : '380px'
    }
};

/**
 * Created by korovin on 3/22/2017.
 */
export default class AddPropertyItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            type: '',
            chosen: ''
        };
    }
    closeModal(e) {
        if (e) {
            e.preventDefault();
        }
        this.setState({modalIsOpen: false});
    }
    onClick(e) {
        e.preventDefault();
        if (this.props.chosen) {
            this.setState({
                modalIsOpen: true,
                type: this.props.chosen.attr('typeof'),
                chosen: Annotation.deserializeRDFa(this.props.chosen)
            });
            return;
        }

        alert('Please click over annotated entity');
    }
    render() {
        return (
            <div>
                <Modal
                    isOpen={ this.state.modalIsOpen }
                    onRequestClose={ this.closeModal.bind(this) }
                    style={ customStyles }
                    contentLabel="Add Property">
                    <EntityPropertyForm closeModal={ this.closeModal.bind(this) } type={ this.state.type } chosen={ this.state.chosen } />
                </Modal>
                <MenuItem onClick={this.onClick.bind(this)}>Add Property</MenuItem>
            </div>
        )
    }
}
