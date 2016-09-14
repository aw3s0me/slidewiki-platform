import UserProfileStore from '../stores/UserProfileStore';
import {navigateAction} from 'fluxible-router';

export default function saveDeckEdit(context, payload, done) {
    //enrich with user id
    let userid = context.getStore(UserProfileStore).userid;
    //payload.userid = '17';

    if (userId == null || userId === '') {
        context.executeAction(navigateAction, {
            url: '/'
        });
    } else {
        context.service.update('deck.update', payload, null, {timeout: 30 * 1000}, (err, res) => {
            if (err) {
                context.dispatch('SAVE_DECK_EDIT_FAILURE', err);
            } else {
                context.dispatch('SAVE_DECK_EDIT_SUCCESS', res);
            }
            done();
        });
    }
}


