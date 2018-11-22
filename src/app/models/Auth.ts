/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as Cookie from 'js-cookie';
import * as m from 'mithril';
import { initialize } from '../app';
import { GithubProfileDto } from '../interfaces/GitHubProfile';
import { request } from '../request';
import { HttpError } from '../interfaces/HttpError';
import State from './State';

const AuthModel = {
    profile: null as GithubProfileDto | null,
    isLogginIn: false as boolean,
    isFetchingProfile: false as boolean,
    async fetchProfile() {
        AuthModel.isFetchingProfile = true;
        return request({
            method: 'GET',
            url: `${process.env.API_URL}profile`
        }).then((result: GithubProfileDto) => {
            AuthModel.isFetchingProfile = false;
            AuthModel.profile = result;
        }).catch((error: HttpError) => {
            AuthModel.isFetchingProfile = false;
            State.HttpErrorModel.add(error);
        });
    },
    async logout() {
        Cookie.remove('token');
        initialize();
        m.route.set('/');
        State.clearState();
    },
};

type AuthModel = typeof AuthModel;
export default AuthModel;