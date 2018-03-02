import AnnotationStore from "../../stores/AnnotationStore";
import Property from "./classes/Property";

/**
 * Created by korovin on 3/23/2017.
 */
export default function addProperty(context, payload, done) {
    const { value, chosen } = payload;
    const { curPropType } = context.getStore(AnnotationStore).getState();
    
    let prop = new Property(value, curPropType);
    
    chosen.addPropertyToHtml(prop);
    done();
}
