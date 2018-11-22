/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { GithubProfileDto } from '../interfaces/GitHubProfile';
import State from '../models/State';
import Spinner from './Spinner';

interface Attrs {
    profile: GithubProfileDto | null;
}

type Vnode = m.Vnode<Attrs, ProfileNavItem>;

export default class ProfileNavItem extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { profile } = vnode.attrs;
        return (
            <Spinner isLoading={State.AuthModel.isFetchingProfile} class="jf-loader-sm mr-3">
                <div class="jf-profile-nav-item">
                    {profile ?
                        <div class="btn-group">
                            <div
                                class="dropdown-toggle mt-2"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <img
                                    src={profile.avatar_url}
                                    class="rounded"
                                    alt={`@${profile.email}`}
                                    height="25"
                                    width="25"
                                />
                                <span><i class="fas fa-caret-down jf-caret-down ml-2" /></span>
                            </div>
                            <div class="dropdown-menu dropdown-menu-right">
                                <div
                                    class="dropdown-item jf-dropdown-name"
                                    href="profile"
                                    oncreate={m.route.link}
                                >
                                    Signed in as <br /> <b>{profile.login}</b>
                                </div>
                                <div class="dropdown-divider" />
                                <button
                                    href="profile"
                                    oncreate={m.route.link}
                                    class="dropdown-item jf-dropdown-item"
                                    type="button"
                                >
                                    Your profile
                                </button>
                                <div class="dropdown-divider" />
                                <button
                                    type="button"
                                    class="dropdown-item jf-dropdown-item"
                                    onclick={State.AuthModel.logout}
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                        : <button
                            class="btn btn-outline-danger"
                            type="button"
                            onclick={State.AuthModel.logout}
                        >
                            Sign out
                        </button>
                    }
                </div>
            </Spinner>
        );
    }
}