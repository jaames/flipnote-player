import React from 'react';
import { render } from 'react-dom';
import App from '@/App';

import { ServiceList, getFlipnotePublicUrls } from '@/services/index';

window['ServiceList'] = ServiceList;
window['getFlipnotePublicUrls'] = getFlipnotePublicUrls;

render(<App/>, document.getElementById('root'));