/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import QuillEditor from '../components/QuillEditor';
import State from '../models/State';

export default class CreateLog implements m.Component {
    private runNumber: number;

    constructor(vnode: any) {
        this.runNumber = vnode.attrs.runNumber;
    }

    addToCreateLog = (event) => {
        State.LogModel.createLog[event.target.id] = event.target.value;
    }

    addRunsToCreateLog = (event) => {
        State.RunModel.fetchById(event.target.value).then(() => {
            State.LogModel.createLog.runs = new Array();
            State.LogModel.createLog.runs.push(State.RunModel.current);
        });
    }

    addDescription = (content: string) => {
        State.LogModel.createLog.text = content;
    }

    saveLog() {
        if (this.runNumber) {
            State.LogModel.createLog.runs = new Array();
            State.LogModel.createLog.runs.push(State.RunModel.current);
        }
        State.LogModel.save().then(() => {
            m.route.set('/Logs');
        });
    }

    view() {
        return (
            <form
                onsubmit={e => {
                    e.preventDefault();
                    this.saveLog();
                }}
            >
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8 mx-auto bg-light rounded p-4 shadow-sm">
                            <div><h3>{`Create a new log ${this.runNumber ? `for run number ${this.runNumber}` : ''}`}</h3></div>
                            <div class="form-group">
                                <label for="title">Title:</label>
                                <div class="field">
                                    <input
                                        id="title"
                                        type="text"
                                        class="form-control"
                                        placeholder="Title"
                                        required
                                        oninput={this.addToCreateLog}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="subtype">Select subtype:</label>
                                <div class="field">
                                    <select id="subtype" class="form-control" name="subtype" required onclick={this.addToCreateLog}>
                                        <option value="run">run</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="subtype">Run number:</label>
                                <div class="field">
                                <input
                                        id="runs"
                                        type="number"
                                        class="form-control"
                                        placeholder="Run number"
                                        value={this.runNumber && this.runNumber}
                                        required
                                        oninput={this.addRunsToCreateLog}
                                />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <input name="description" type="hidden" />
                                <QuillEditor postContent={this.addDescription} />
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
