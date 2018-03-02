const ENTITY_CLASS = 'r_entity';
const ENTITY_CLASS_PREFIX = 'r_';
const RDFS_NS = 'http://www.w3.org/2000/01/rdf-schema#';
const DBO_NS = 'http://dbpedia.org/ontology/';
const PROPERTY_CLASS = 'r_prop';
const BASE_PROPERTY_CLASS = 'r_name';
const BASE_PROPERTY_TYPE = RDFS_NS + 'type';

/**
 * Created by korovin on 3/12/2017.
 */
export default class Annotation {
    constructor(uri, type, name, id) {
        this.className = ENTITY_CLASS_PREFIX + type.toLowerCase();
        this.id = id;
        this.typeof = DBO_NS + type;
        this.class = ENTITY_CLASS;
        this.type = type;
        this.uri = uri;
        this.name = name;
    }

    /**
     * @return {string}
     */
    static get BASE_ENTITY_CLASS() {
        return ENTITY_CLASS;
    }

    static deserializeRDFa(rdfaHtml) {
        if (!rdfaHtml) {
            return null;
        }

        const uri = rdfaHtml.attr('resource');
        const type = rdfaHtml.attr('typeof').substring(28);
        const name = rdfaHtml.find('.r_name').text();
        const id = rdfaHtml.data('id');
        return new Annotation(uri, type, name, id);
        // TODO: deserialize properties as well
    }

    addPropertyToHtml(prop) {
        let jqHtml = this.jqHTML;
        if (!jqHtml) return;

        jqHtml.append(prop.toHtml());
    }

    get jqHTML() {
        return $('#inlineContent').find('span[data-id="' + this.id + '"]');
    }

    toHtml(text) {
        return `<span class="${PROPERTY_CLASS} ${BASE_PROPERTY_CLASS}" property="${BASE_PROPERTY_TYPE}">${text}</span>`;
    }
}
