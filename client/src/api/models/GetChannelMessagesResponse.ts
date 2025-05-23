/* tslint:disable */
/* eslint-disable */
/**
 * server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { ChannelMessageResponse } from './ChannelMessageResponse';
import {
    ChannelMessageResponseFromJSON,
    ChannelMessageResponseFromJSONTyped,
    ChannelMessageResponseToJSON,
} from './ChannelMessageResponse';

/**
 * 
 * @export
 * @interface GetChannelMessagesResponse
 */
export interface GetChannelMessagesResponse {
    /**
     * 
     * @type {Array<ChannelMessageResponse>}
     * @memberof GetChannelMessagesResponse
     */
    messages: Array<ChannelMessageResponse>;
}

/**
 * Check if a given object implements the GetChannelMessagesResponse interface.
 */
export function instanceOfGetChannelMessagesResponse(value: object): value is GetChannelMessagesResponse {
    if (!('messages' in value) || value['messages'] === undefined) return false;
    return true;
}

export function GetChannelMessagesResponseFromJSON(json: any): GetChannelMessagesResponse {
    return GetChannelMessagesResponseFromJSONTyped(json, false);
}

export function GetChannelMessagesResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetChannelMessagesResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'messages': ((json['messages'] as Array<any>).map(ChannelMessageResponseFromJSON)),
    };
}

export function GetChannelMessagesResponseToJSON(value?: GetChannelMessagesResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'messages': ((value['messages'] as Array<any>).map(ChannelMessageResponseToJSON)),
    };
}

