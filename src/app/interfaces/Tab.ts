/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

export interface Tab {
    name: string;
    id: string;
    active?: boolean;
    content: (entity?: object) => JSX.Element | string;
}
