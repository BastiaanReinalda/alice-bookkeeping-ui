/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

export interface ResponseObject<T> {
    apiVersion: string;
    meta?: Meta;
    data: {
        [key: string]: any;
        item: T;
    };
}

export interface ResponseObjectCollection<T> {
    apiVersion: string;
    meta?: Meta;
    data: {
        [key: string]: any;
        items: T[];
    };
}

export interface Meta {
    [key: string]: string;
}
