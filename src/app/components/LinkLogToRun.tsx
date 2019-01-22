/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import Table from './Table';
import * as _ from 'lodash';
import LinkLogToRunColumns from '../constants/LinkLogToRunColumns';
import { store } from '../redux/configureStore';
import { fetchLogs } from '../redux/ducks/log/operations';
import { linkLogToRun, fetchRun } from '../redux/ducks/run/operations';
import { selectLogs } from '../redux/ducks/log/selectors';
import { selectFilters } from '../redux/ducks/filter/selectors';
import { FilterName } from '../interfaces/Filter';
import { returnQueryParams } from '../utility/UrlUtil';
import Filter from './Filter';
import { setFilter } from '../redux/ducks/filter/actions';

const inputFields = [
    {
        name: 'logId',
        type: 'number',
        label: 'Log id',
        event: 'onchange',
        placeholder: 'e.g. 1'
    },
    {
        name: 'searchterm',
        type: 'text',
        label: 'Title',
        event: 'onchange',
        placeholder: 'e.g. EOR report'
    }
];
interface Attrs {
    /**
     * The run number of the run to be linked to a log.
     */
    runNumber: number;
}

type Vnode = m.Vnode<Attrs, LinkLogToRun>;

/**
 * Component enables linking logs to runs.
 */
export default class LinkLogToRun extends MithrilTsxComponent<Attrs> {
    oninit() {
        store.dispatch(fetchLogs());
    }

    /**
     * Link a log to a run by calling a PATCH api call.
     * Fetch the updated run afterwards.
     */
    linkLogToRun = (logId: number, runNumber: number) => {
        store.dispatch(linkLogToRun(logId, runNumber)).then(() =>
            store.dispatch(fetchRun(runNumber)).then(() =>
                m.redraw()
            )
        );
    }

    /**
     * Builds the query and fetch with the filters in the current state.
     */
    setQueryAndFetch = (): void => {
        const logFilters = selectFilters(store.getState())[FilterName.Log];
        const queryString = returnQueryParams(logFilters);
        store.dispatch(fetchLogs(queryString as string));
    }

    view(vnode: Vnode) {
        const logFilters = selectFilters(store.getState())[FilterName.Log];
        return (
            <div>
                <Filter
                    inputFields={inputFields}
                    onEvent={(key: string, value: string | number | null) => {
                        store.dispatch(setFilter(FilterName.Log, key, value));
                        this.setQueryAndFetch();
                    }}
                    filters={logFilters}
                />
                <Table
                    data={selectLogs(store.getState())}
                    columns={LinkLogToRunColumns(vnode.attrs.runNumber, this.linkLogToRun)}
                />
            </div>
        );
    }
}
