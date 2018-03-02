/**
 * Created by korovin on 3/22/2017.
 */
export default function getPropertiesDbpedia(context, payload, done) {
    context.service.read('annotations.dbpedia_property', payload, {timeout: 20 * 1000}, (err, res) => {
        let bindings = res.results.results.bindings;
        let mapped = bindings.map(val => {
            return {
                label: val.nlabel.value.substr(0, 1).toUpperCase() + val.nlabel.value.substr(1),
                uri: val.property.value
            }
        });

        context.dispatch('GET_DBPEDIA_PROPERTIES', mapped);
        done();
    });
}
