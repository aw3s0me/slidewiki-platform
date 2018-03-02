/**
 * Created by korovin on 3/29/2017.
 */
export default function doSemSearch(context, payload, done) {
    const { type } = payload;
    context.service.read('semsearch.' + type, payload, {timeout: 20 * 1000}, (err, res) => {
        if (err || !res || !res.results) {
            console.log(err);
            return;
        }
        // parse here results
        context.dispatch('INIT_SEMSEARCH_RESULTS', res.results);
        done();
    });
}
