import customDate from '../../../components/Deck/util/CustomDate';

/**
 * Created by korovin on 3/30/2017.
 */
export default class Slide {
    constructor(res) {
        this.deck = {
            id: res.usage[0],
            title: '',
            link: ''
        };
        this.link = '/deck/' + res.usage[0] + '/slide/' + res.db_id + '-' + res.db_revision_id;
        this.kind = 'Slide';
        this.title = (res.title && res.title.length > 70) ? res.title.substring(0,70)+'...' : res.title;
        this.description = (res.content && res.content.length > 85) ? res.content.substring(0,85)+'...' : res.content;
        this.lastUpdate = customDate.format(res.lastUpdate, 'Do MMMM YYYY');
        this.user = {
            id: res.creator,
            username: '',
            link: ''
        };
    }
}
