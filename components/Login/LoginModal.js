import React from 'react';
import Modal from 'react-modal';
import {connectToStores} from 'fluxible-addons-react';
import userSignIn from '../../actions/user/userSignIn';
import userSignOut from '../../actions/user/userSignOut';
import UserProfileStore from '../../stores/UserProfileStore';
import ReactDOM from 'react-dom';

const customStyles = {
    content : {
        top                   : '15%',
        left                  : '25%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%'

    }
};



class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {openModal: false};
        this.handleLoginButton = this.handleLoginButton.bind(this);
        this.handleExitButton = this.handleExitButton.bind(this);

    }

    componentDidUpdate(prevProps, prevState) {//Workaround to set focus
        if (prevState.openModal !== this.state.openModal && this.state.openModal === true) {
            setTimeout(() => {
                ReactDOM.findDOMNode(this.refs.email1).focus();
            }, 0);
        }
    }

    handleLoginButton(){
        this.setState({openModal: true});

    }

    handleSignoutButton() {
        this.context.executeAction(userSignOut, {});
    }

    signin(e) {
        e.preventDefault();
        this.context.executeAction(userSignIn, {
          //email: this.refs.emailsignin.value,
            email: this.refs.email1.value,
            password: this.refs.password1.value
        });

        this.refs.email1.value = '';
        this.refs.password1.value = '';
        return false;
    }

    handleExitButton(){
        this.setState({openModal: false});

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UserProfileStore.errorMessage !== '') {
            $('.ui.form.signin').form('add errors', [nextProps.UserProfileStore.errorMessage]);
        } else if (nextProps.UserProfileStore.userid !== ''){
            this.handleExitButton();
        }
    }
    componentDidMount(){
        if(typeof window !== 'undefined') {
            Modal.setAppElement('#app');
        }
    }

    render() {
        let loginButton = (
            <button ref="signoutButton" className="ui inverted button" onClick={this.handleSignoutButton.bind(this)}>Sign Out</button>
        );
        if (this.props.UserProfileStore.username === '') {
            loginButton = (
                <button ref="loginButton" className="ui inverted button" onClick={this.handleLoginButton}>Sign In</button>
            );
        }

        return(
          <div className="item right" >
            {loginButton}
            <Modal id='signinModal' isOpen={this.state.openModal}  style={customStyles}>
              <div className="ui container">
                  <div className="ui right">
                    <button type="cancel" className="ui basic button" onClick={this.handleExitButton}>
                      <i className="remove icon"/>Close
                    </button>
                  </div>
                  <div className="ui blue padded center aligned segment">
                    <h1 className="ui dividing header">Sign In</h1>
                      <form className="ui form signin" onSubmit={this.signin.bind(this)}>
                        <div className="ui five wide icon input field">
                          <div><label htmlFor="email1" hidden>E-Mail</label></div>
                          <input type="email1" id="email1" name="email1" ref="email1" placeholder="E-Mail" autoFocus tabIndex="0" aria-required="true" required/><i className="mail icon"/>
                        </div>
                          <br/>
                        <div className="ui five wide icon input field">
                          <div><label htmlFor="password1" hidden>Password</label></div>
                          <input type="password" id="password1" name="password1" ref="password1" placeholder="Password" tabIndex="0" aria-required="true" required/><i className="lock icon"/>
                        </div>
                        <br/>
                        <div className="ui error message"/>
                        <button type="submit" className="ui blue labeled submit icon button"><i className="icon sign in"/> Sign In</button>
                     </form>
                  <br/>
                  <div className="ui floated right">
                      <a href="">I can not access my account</a>


              </div>
            </div>
          </div>

          </Modal>
          </div>
      );
    }
}

LoginModal.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

LoginModal = connectToStores(LoginModal, [UserProfileStore], (context, props) => {
    return {
        UserProfileStore: context.getStore(UserProfileStore).getState()
    };
});
export default LoginModal;
