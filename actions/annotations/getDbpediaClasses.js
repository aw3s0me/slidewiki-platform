/**
 * Created by korovin on 3/28/2017.
 */
export default function getDbpediaClasses(context, payload, done) {
    let res = require('../../assets/json/dbpedia.json');
    let bindings = res.results.bindings;
    if (bindings.length) {
        context.dispatch('GET_DBPEDIA_CLASSES', parse(bindings));
    }

    done();
}

function parse(bindings) {
    return bindings.map(binding => {
        return {
            label: binding.label.value.charAt(0).toUpperCase() + binding.label.value.slice(1),
            uri: binding.x.value
        }
    })
}
