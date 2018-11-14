/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 *
 * The tabs used by the Log details page.
 */

import * as m from 'mithril';
import { Tab } from '../interfaces/Tab';
import MarkdownViewer from '../components/MarkdownViewer';
import RunColumns from './RunColumns';
import Table from '../components/Table';
import { Log } from '../interfaces/Log';
import State from '../models/State';
import Modal from '../components/Modal';
import AddAttachment from './AddAttachment';

/**
 * The tab information used by the TabHeader and TabContent of the Log detail page.
 */
const LogTabs: Tab[] = [
    {
        name: 'Content',
        id: 'content',
        active: true,
        content: (log: Log): JSX.Element | string => (
            log.text
                ? <MarkdownViewer key={'CreateLogMarkdown'} content={log.text} />
                : 'This log has no text'
        )
    },
    {
        name: 'Runs',
        id: 'runs',
        content: (log: Log): JSX.Element | string => (
            log.runs && log.runs.length > 0
                ? <Table data={log.runs} columns={RunColumns} />
                : 'This log has no runs'
        )
    },
    {
        name: 'Subsystems',
        id: 'subsystems',
        content: (): string => (
            'Not yet implemented'
        )
    },
    {
        name: 'Users',
        id: 'users',
        content: (): string => (
            'Not yet implemented'
        )
    },
    {
        name: 'Files',
        id: 'files',
        content: (log: Log): JSX.Element | string => (
            (
                <div>
                    <ul>
                        {State.AttachmentModel.list.map((attachment: any) =>
                            <li key={attachment.id}>
                                <a
                                    id={attachment.id}
                                    download={attachment.title}
                                    href={State.AttachmentModel.download(attachment)}
                                >
                                    {attachment.title}
                                </a>
                            </li>
                        )}
                    </ul>
                    <hr />
                    <button
                        type="button"
                        class="btn btn-primary btn-lg"
                        data-toggle="modal"
                        data-target="#modal"
                        style="margin-bottom:1rem;"
                    >Add new file
                    </button>
                    <Modal
                        title="Add attachment"
                        body={AddAttachment}
                    />
                </div>
            )
        )
    }
];

type LogTabs = typeof LogTabs;
export default LogTabs;
