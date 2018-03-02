const OBJECT_PROP_NS = 'http://www.w3.org/2002/07/owl#ObjectProperty';
const OBJECT_DBPEDIA_NS = 'http://dbpedia.org/ontology/';
const DATATYPE_XML_NS = 'http://www.w3.org/2001/XMLSchema#';
const DATATYPE_PROP_NS = 'http://www.w3.org/2002/07/owl#DatatypeProperty';
const OBJECT_TYPE_VAL = 'object';
const DATATYPE_VAL = 'datatype';

/**
 * Created by korovin on 3/23/2017.
 */
export default class PropertyHelper {
    static getMeta(prop, property) {
        const type = PropertyHelper.getType(prop);
        return {
            type: type,
            range: PropertyHelper.getRange(prop.range, type),
            original: prop,
            property: property
        }
    }

    static getType(prop) {
        if (!prop || !prop.type || !prop.type.value) {
            return null;
        } else if (prop.type.value === OBJECT_PROP_NS) {
            return OBJECT_TYPE_VAL;
        } else if (prop.type.value === DATATYPE_PROP_NS) {
            return DATATYPE_VAL;
        } else {
            return null;
        }
    }

    static getRange(range, type) {
        if (!type || !range || !range.value) return null;

        if ((type === DATATYPE_VAL) &&
            (range.value.substring(0, 33) === DATATYPE_XML_NS)) {
            return range.value.substring(33);
        } else if ((type === OBJECT_TYPE_VAL) &&
            (range.value.substring(0, 28) === OBJECT_DBPEDIA_NS)) {
            return range.value.substring(28);
        } else if (range.value) {
            return range.value;
        } else {
            return null;
        }
    }

    static get OBJECT_TYPE_VAL() {
        return OBJECT_TYPE_VAL;
    }

    static get DATATYPE_TYPE_VAL() {
        return DATATYPE_VAL;
    }
}
