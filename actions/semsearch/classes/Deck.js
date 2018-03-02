import customDate from '../../../components/Deck/util/CustomDate';

/**
 * Created by korovin on 3/30/2017.
 */
export default class Deck {
    constructor(id, link) {
        this.id = id;
        this.link = link;
        this.slides = [];
        this.hasRevision = false;
        this.kind = 'Deck';
    }

    addSlide(slide) {
        this.slides.push(slide);
    }

    addLastRevision(deckObj) {
        if (this.hasRevision) {
            return;
        }

        this.hasRevision = true;

        this.link = '/deck/' + deckObj.db_id + '-' + deckObj.db_revision_id;
        this.title = this._initTitle(deckObj.title);
        this.description = this._initDescription(deckObj.description);
        this.lastUpdate = this._initLastUpdate(deckObj.lastUpdate);
        this.user = {
            id: deckObj.creator,
            username: '',
            link: ''
        };
    }

    _initTitle(title) {
        return (title && title.length > 70) ? title.substring(0,70)+'...' : title;
    }

    _initDescription(description) {
        return (description && description.length > 85) ? description.substring(0,85)+ '...' : description;
    }

    _initLastUpdate(lastUpdate) {
        return customDate.format(lastUpdate, 'Do MMMM YYYY');
    }

    addDeckInfo(deckObj) {
        if (this.hasRevision) return;
        let revision = deckObj.revisions[deckObj.revisions.length - 1];
        this.title = this._initTitle(revision.title);
        this.description = this._initDescription(deckObj.description);
        this.lastUpdate = this._initLastUpdate(deckObj.lastUpdate);
        this.user = {
            id: deckObj.user,
            username: '',
            link: ''
        };
    }
}
