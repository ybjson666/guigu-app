import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './routers'
import rem from './utils/rem'


rem(document,window);

ReactDOM.render(<Routers/>, document.getElementById('root'));

