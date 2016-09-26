import {serviceUnavailable} from '../../loadErrors';

import {shortTitle} from '../../../configs/general';

export default function loadNewUserNotifications(context, payload, done) {
    context.service.read('notifications.listnew', payload, {timeout: 20 * 1000}, (err, res) => {
        if (err) {
          if (err) {
            context.executeAction(serviceUnavailable, payload).catch((error) => {done(error);});
            return;
            // context.dispatch('LOAD_NEW_USER_NOTIFICATIONS_FAILURE', err);
        } else {
            context.dispatch('LOAD_NEW_USER_NOTIFICATIONS_SUCCESS', res);
        }

        done();
    });
}
