import Annotation from "./classes/Annotation";
import DeckPageStore from "../../stores/DeckPageStore";

/**
 * Created by korovin on 3/23/2017.
 */
export default function saveAnnotationsBulk(context, payload, done) {
    let annotationsHtml = $('#inlineContent').find('.r_entity');
    let annotationsArr = [];
    if (!annotationsHtml.length) {
        done();
        return;
    }

    const { selector: { id: deckId, sid: slideId } } = context.getStore(DeckPageStore).getState();
    annotationsHtml.each((index, html) => {
        let anno = Annotation.deserializeRDFa($(html));
        annotationsArr.push({
            annotation: anno,
            html: anno.jqHTML[0].outerHTML,
            slide: slideId,
            deck: deckId
        });
    });

    context.service.create('annotations.savebulk', {
        annotations: annotationsArr
    }, {timeout: 20 * 1000}, (err, res) => {
        // TODO: check if result is succesfull
        console.log(res);
        done();
    });
}
