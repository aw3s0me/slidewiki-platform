import PropertyHelper from "../utils/PropertyHelper";

/**
 * Created by korovin on 3/23/2017.
 */
export default class Property {
    constructor(value, prop) {
        this.prop = prop;
        this.uri = prop.property;
        this.type = prop.type;
        this.range = prop.original.range.value? prop.original.range.value: null;
        console.log(this.prop);
        this.value = value;
    }

    toHtml() {
        if (!this.type) {
            return null;
        }

        // if type object -> return meta with resource
        if (this.type === PropertyHelper.OBJECT_TYPE_VAL) {
            return `<meta property="${ this.uri }" resource="${ 'http://' + this.value }" data-type=${ this.type }/>`;
        // if type datatype -> return meta with content and datatype
        } else if (this.type === PropertyHelper.DATATYPE_TYPE_VAL && this.range) {
            return `<meta property="${ this.uri }" content="${ this.value }" datatype="${ this.range }" data-type=${ this.type } />`;
        } else {
            return `<meta property="${ this.uri }" content="${ this.value }" />`;
        }
    }
}
