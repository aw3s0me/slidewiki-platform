import rp from 'request-promise';
import { Microservices } from '../configs/microservices';
import SearchParser from '../actions/semsearch/utils/SearchParser';

/**
 * Created by korovin on 3/29/2017.
 */
export default {
    name: 'semsearch',
    read: (req, resource, params, config, callback) => {
        switch (resource) {
            case 'semsearch.keyword':
                searchByKeywords(params, callback);
                break;
            case 'semsearch.semantic':
                searchBySemantic(params, callback);
                break;
            case 'semsearch.hybrid':
                searchHybrid(params, callback);
                break;
            default:
                callback(null, {success: false, results: {}});
                return;
        }
    }
};

function searchByKeywords(params, callback) {
    if (!params.keywords) {
        callback(null, {success: false, results: {}});
        return;
    }

    const { search } = Microservices;
    const uri = search.uri + '/search?' + getEncodedParams(params);
    rp.get({
        uri: uri
    }).then(results => {
        // TODO: parse results
        let res = JSON.parse(JSON.stringify(results));
        if (!res) {
            callback(null, {success: false, results: {}});
        }

        let { response } = JSON.parse(res);
        let parsedRes = SearchParser.parse(response);

        // iterate here and return array of search results
        let deckPromises = getDeckPromises(parsedRes);

        Promise.all(deckPromises).then(_ => {
            callback(null, {
                success: true,
                results: parsedRes
            });
        }).catch(err =>
            callback(null, {success: false, results: {}})
        );
    });
}

function getDeckPromises(parsedRes) {
    return parsedRes.map(obj => {
        const uri = Microservices.deck.uri + '/deck/' + obj.id;
        return rp.get({uri: uri}).then(deckRes => {
            let deckObj = JSON.parse(deckRes);
            obj.addDeckInfo(deckObj);
            return Promise.resolve(deckRes);
        }).catch(err => {
            console.log(err);
            return Promise.resolve(err);
        });
    });
}

function encodeParam(encodedParams, key, value){
    if(value.trim() === '')
        return '';

    return ((encodedParams) ? '&' : '')
        + encodeURIComponent(key) + '=' + encodeURIComponent(value);
}

// TODO: awful copy-pasted code from Search Panel. will fix it one day
function getEncodedParams(params){
    let queryparams = {
        keywords: (params && params.keywords)
            ? params.keywords       // if keywords are set from redirection
            : (this.refs.keywords.getSelected().trim() || '*:*')
    };

    // encode params
    let encodedParams = '';
    for(let key in queryparams){
        if(queryparams[key] instanceof Array){
            for(let el in queryparams[key]){
                encodedParams += encodeParam(encodedParams, key, queryparams[key][el]);
            }
        }
        else{
            encodedParams += encodeParam(encodedParams, key, queryparams[key]);
        }
    }

    return encodedParams;
}

function searchBySemantic(params, callback) {
    console.log(params);
    callback(null, {
        success: true,
        results: { good: true }
    });
}

function searchHybrid(params, callback) {

}
