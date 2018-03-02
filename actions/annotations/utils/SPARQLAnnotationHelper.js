/**
 * Created by korovin on 3/22/2017.
 */
export default class SPARQLAnnotationHelper {
    /**
     * Get properties for type from dbpedia
     * @param type
     * @returns {string}
     */
    static getProperties(type) {
        return `
            SELECT DISTINCT ?property ?nlabel 
            WHERE { {
                ?property <http://www.w3.org/2000/01/rdf-schema#domain> <${type}> .
                ?property <http://www.w3.org/2000/01/rdf-schema#label> ?label .
                FILTER ( LANG(?label) = "en" )
            } UNION {
              ?property <http://www.w3.org/2000/01/rdf-schema#domain> ?class . 
              <${type}> rdfs:subClassOf+ ?class .
              ?property <http://www.w3.org/2000/01/rdf-schema#label> ?label .
              FILTER ( LANG(?label) = "en" )
            }
            BIND (STR(?label)  AS ?nlabel)
            }`;
    }

    static getPropertyMeta(property) {
        return `
            SELECT DISTINCT ?type ?range
            WHERE { 
                OPTIONAL { <${property}> <http://www.w3.org/2000/01/rdf-schema#range> ?range }
                <${property}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> ?type .
                FILTER(STRSTARTS(STR(?type), "http://www.w3.org/2002/07/owl#"))
            }`;
    }

    static getAllClasses() {
        return `
            SELECT ?x ?label WHERE
            { 
              ?x a owl:Class. 
              ?x rdfs:label ?label .           
              FILTER (lang(?label) = 'en').  
            }
        `;
    }

    static getPropertiesForClass(mclass) {
        return `
            SELECT DISTINCT ?property ?label WHERE{
            {
              ?property rdfs:domain ?class . 
              <${mclass}> rdfs:subClassOf+ ?class.
            } UNION {
              ?property rdfs:domain <${mclass}>.
            }
            ?property <http://www.w3.org/2000/01/rdf-schema#label> ?label .
                            FILTER ( LANG(?label) = "en" )
            }`;
    }
}
