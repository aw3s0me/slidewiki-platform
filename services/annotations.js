import rp from 'request-promise';
import { Microservices } from '../configs/microservices';
import SPARQLAnnotationHelper from "../actions/annotations/utils/SPARQLAnnotationHelper";

const SPARQL_QUERY = `PREFIX dbo:  <http://dbpedia.org/resource/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?subj ?link WHERE
{
    ?subj foaf:isPrimaryTopicOf ?link.
    FILTER(?subj IN (`;

const SPOTLIGHT_BASE_URL = 'http://spotlight.sztaki.hu:2222/rest/annotate?text=';
const MAX_HITS = 5;
const DBPEDIA_LOOKUP_BASE_URL = 'http://lookup.dbpedia.org/api/search.asmx/KeywordSearch?QueryString=';
const DBPEDIA_VIRTUOSO_BASE_URL = 'http://dbpedia.org/sparql';
const DBPEDIA_RESOURCE_PREFIX = 'dbo:';

/**
 * Created by korovin on 3/12/2017.
 */
export default {
    name: 'annotations',
    read: (req, resource, params, config, callback) => {
        switch (resource) {
            case 'annotations.classprop':
                getDbpediaPropsForClass(params, callback);
                break;
            case 'annotations.allclasses':
                getDbpediaClasses(callback);
                break;
            case 'annotations.suggestions':
                getDbpediaAnnotations(params, callback);
                break;
            case 'annotations.wikipedia':
                getWikipediaLinks(params, callback);
                break;
            case 'annotations.uri':
                getDbpediaURISuggestions(params, callback);
                break;
            case 'annotations.dbpedia_property':
                getDbpediaProperties(params, callback);
                break;
            case 'annotations.dbpedia_propmeta':
                getDbpediaPropertyMeta(params, callback);
                break;
            default:
                callback(null, {success: false, results: {}});
                return;
        }
    },
    create: (req, resource, params, body, config, callback) => {
        console.log(callback);
        switch (resource) {
            case 'annotations.new':
                saveNewAnnotation(params, callback);
                break;
            case 'annotations.savebulk':
                saveBulkAnnotations(params, callback);
                break;
            default:
                return;
        }
    }
};

function getDbpediaClasses(callback) {
    const sparql = SPARQLAnnotationHelper.getAllClasses();
    console.log(sparql);
    callback(null, {
        success: true,
        results: require('../assets/json/dbpedia.json')
    });
}

function getDbpediaPropsForClass(params, callback) {
    const { type } = params;

    if (!type) {
        callback(null, {success: false, results: {}});
        return;
    }

    const sparql = SPARQLAnnotationHelper.getPropertiesForClass(type);
    console.log(sparql);

    rp.post({
        uri: DBPEDIA_VIRTUOSO_BASE_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            query: sparql,
            format: 'application/json'
        }
    }).then((res) => {
        callback(null, {
            success: true,
            results: JSON.parse(res)
        });
    }).catch(err => {
        callback(null, {success: false, results: {}});
    });
}

function getDbpediaProperties(params, callback) {
    const { type } = params;

    if (!type) {
        callback(null, {success: false, results: {}});
        return;
    }

    const sparql = SPARQLAnnotationHelper.getProperties(type);
    console.log(sparql);

    rp.post({
        uri: DBPEDIA_VIRTUOSO_BASE_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            query: sparql,
            format: 'application/json'
        }
    }).then((res) => {
        callback(null, {
            success: true,
            results: JSON.parse(res)
        });
    }).catch(err => {
        callback(null, {success: false, results: {}});
    });
}

function getDbpediaPropertyMeta(params, callback) {
    const { property } = params;

    if (!property) {
        callback(null, {success: false, results: {}});
        return;
    }

    const sparql = SPARQLAnnotationHelper.getPropertyMeta(property);

    rp.post({
        uri: DBPEDIA_VIRTUOSO_BASE_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            query: sparql,
            format: 'application/json'
        }
    }).then((res) => {
        callback(null, {
            success: true,
            results: JSON.parse(res)
        });
    }).catch(err => {
        callback(null, {success: false, results: {}});
    });
}

function saveBulkAnnotations(params, callback) {
    if (!params.annotations) {
        callback(null, {success: false, results: {}});
        return;
    }

    const { semsearch } = Microservices;
    const uri = semsearch.uri + ":" + semsearch.port + semsearch.path + '/annotations/bulk ';

    let body = params.annotations.map(anno => {
        return {
            body: anno.html,
            slide: anno.slide,
            deck: anno.deck,
            typeof: anno.annotation.typeof,
            id: anno.annotation.id,
            resource: anno.annotation.uri,
            keyword: anno.annotation.name
        }
    });

    rp.post({
        uri: uri,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ list: body })
    }).then(res => {
        console.log(callback);
        console.log('SUCC');
        console.log(res);
        callback(null, {
            success: true,
            results: JSON.parse(JSON.stringify(res))
        });
    }).catch(err => {
        callback(null, {success: false, results: {}});
    });
}

function saveNewAnnotation(params, callback) {
    if (!params.annotation || !params.html || !params.slide || !params.deck) {
        callback(null, {success: false, results: {}});
        return;
    }

    const { semsearch } = Microservices;
    const uri = semsearch.uri + ":" + semsearch.port + semsearch.path + '/annotations';
    const body = {
        body: params.html,
        slide: params.slide,
        deck: params.deck,
        typeof: params.annotation.typeof,
        id: params.annotation.id,
        resource: params.annotation.uri,
        keyword: params.annotation.name
    };

    rp.post({
        uri: uri,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        console.log(callback);
        console.log('SUCC');
        console.log(res);
        callback(null, {
            success: true,
            results: JSON.parse(JSON.stringify(res))
        });
    }).catch(err => {
        callback(null, {success: false, results: {}});
    });
}

function getDbpediaURISuggestions(params, callback) {
    if (!params.keyword || !params.type) {
        callback(null, {success: false, results: {}});
        return;
    }

    let queryClass = '&Quer‌​yClass=' + params.type.toLowerCase();
    let maxHits = '&MaxHits=' + MAX_HITS;
    let url = DBPEDIA_LOOKUP_BASE_URL + encodeURI(params.keyword) + queryClass + maxHits;

    rp.get({
        uri: url,
        headers: {
            'Accept': 'application/json'
        }
    }).then((res) => {
        callback(null, {
            success: true,
            results: JSON.parse(res).results
        });
    }).catch(err => {
        callback(null, {success: false, results: {}});
    });
}

function getDbpediaAnnotations(params, callback) {
    if (!params.text) {
        callback(null, {success: false, results: {}});
        return;
    }

    let url = SPOTLIGHT_BASE_URL + encodeURI(params.text) + '&confidence=0.4&support=20&types=' + encodeURI(params.types);

    rp.post({
        uri: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        callback(null, {
            success: true,
            results: JSON.parse(JSON.stringify(res || null ))
        });
    }).catch(err => {
        callback(null, {success: false, results: {}});
    });
}

function getWikipediaLinks(params, callback) {
    if (!params.suggestions || !params.suggestions.length) {
        callback(null, {success: false, results: {}});
    }

    let sparqlLinks = params.suggestions.map(sug => {
        return DBPEDIA_RESOURCE_PREFIX + sug.id;
    }).join(',');

    rp.post({
        uri: DBPEDIA_VIRTUOSO_BASE_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            query: SPARQL_QUERY + sparqlLinks + '))}',
            format: 'application/json'
        }
    }).then((res) => {
        callback(null, {
            success: true,
            results: JSON.parse(res)
        });
    }).catch(err => {
        callback(null, {success: false, results: {}});
    });
}
