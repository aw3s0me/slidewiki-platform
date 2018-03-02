import Slide from "./../classes/Slide";
import {Microservices} from '../../../configs/microservices';
import Deck from "../classes/Deck";

const DECK_TYPE = 'deck';
const SLIDE_TYPE = 'slide';

/**
 * Created by korovin on 3/30/2017.
 */
export default class SearchParser {
    static parse(res) {
        let decks = {};
        res.docs.forEach(doc => {
            if (doc.kind === DECK_TYPE) {
                SearchParser.deckParse(decks, doc);
            } else if (doc.kind === SLIDE_TYPE) {
                SearchParser.slideParse(decks, doc);
            }
        });

        return Object.keys(decks).map((key) => {
            return decks[key];
        });
    }

    static deckParse(decks, deckObj) {
        const deckId = deckObj.db_id + '-' + deckObj.db_revision_id;
        let deck = null;
        if (decks.hasOwnProperty(deckId)) {
            deck = decks[deckId];
            if (!deck.hasRevision) {
                deck.addLastRevision(deckObj);
            }
        } else {
            deck = decks[deckId] = new Deck(deckId, '/deck/' + deckId);
        }
    }

    static slideParse(decks, slideObj) {
        const deckId = slideObj.usage[0];

        let slide = new Slide(slideObj);

        if (!decks.hasOwnProperty(deckId)) {
            decks[deckId] = new Deck(deckId, '/deck/' + slideObj.usage[0]);
            decks[deckId].addSlide(slide);
        } else {
            decks[deckId].addSlide(slide);
        }
    }
}
