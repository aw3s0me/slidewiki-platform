/**
 * Created by korovin on 3/29/2017.
 */
export default function getPropertiesDbpedia(context, payload, done) {
    context.service.read('annotations.classprop', payload, {timeout: 20 * 1000}, (err, res) => {
        let bindings = res.results.results.bindings;
        let mapped = bindings.map(val => {
            return {
                label: val.label.value.substr(0, 1).toUpperCase() + val.label.value.substr(1),
                uri: val.property.value
            }
        });

        context.dispatch('GET_DBPEDIA_PROPERTIES_CLASS', mapped);
        done();
    });
}
