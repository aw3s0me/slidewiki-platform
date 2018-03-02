import React, {Component} from 'react';

export default class RadioboxSearchType extends Component {
    componentDidMount() {
        let self = this;
        $(this._radio).find('.radio').checkbox({
            onChange: function() {
                let val = $(this).val();
                self.props.onChange(val);
            }
        });
        $(this._firstRadio).attr('checked', 'checked');

        // TODO: load suggestions from tag service
    }
    onChange(e) {
        console.log(e);
    }
    render() {
        return (
            <div className="ui form" >
                <div ref={radio => this._radio = radio } className="inline fields">
                    <label htmlFor="searchType">Search Type</label>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input type="radio" name="type" value="keyword"  />
                            <label>Keyword</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input type="radio" name="type" value="semantic" />
                            <label>Semantic</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input ref={firstRadio => this._firstRadio = firstRadio} type="radio" name="type" value="hybrid" />
                            <label>Hybrid</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
