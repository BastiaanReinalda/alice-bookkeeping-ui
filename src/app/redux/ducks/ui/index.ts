/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import reducer from './reducers';

import * as uiSelectors from './selectors';
import * as uiTypes from './types';

/**
 * Exposes the public API for this duck.
 */

export {
    uiSelectors,
    uiTypes
};

export default reducer;
