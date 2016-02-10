import React from 'react';
import SlideControl from './SlideControl';
import {NavLink} from 'fluxible-router';

class SlidePanel extends React.Component {
    render() {
        return (
            <div ref="slidePanel">

                <div className="ui grey inverted segment">

                    <h2>Introduction</h2>
                    <div>
                        Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui ewf.
                        <ul>
                            <li><NavLink href="/deck/56/slide/45">item 1</NavLink></li>
                            <li>item 2</li>
                            <li>item 3</li>
                        </ul>
                         Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.

                    </div>


                </div>

                <SlideControl />
            </div>
        );
    }
}

export default SlidePanel;
