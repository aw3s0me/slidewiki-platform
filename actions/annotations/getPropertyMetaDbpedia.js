import PropertyHelper from "./utils/PropertyHelper";

/**
 * Created by korovin on 3/22/2017.
 */
export default function getPropertyMetaDbpedia(context, payload, done) {
    context.service.read('annotations.dbpedia_propmeta', payload, {timeout: 20 * 1000}, (err, res) => {
        let bindings = res.results.results.bindings;
        if (bindings.length) {
            context.dispatch('GET_DBPEDIA_PROPERTY_META', PropertyHelper.getMeta(bindings[0], payload.property));
        }

        done();
    });
}
