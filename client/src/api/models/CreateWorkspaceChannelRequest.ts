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
/**
 * 
 * @export
 * @interface CreateWorkspaceChannelRequest
 */
export interface CreateWorkspaceChannelRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateWorkspaceChannelRequest
     */
    name: string;
}

/**
 * Check if a given object implements the CreateWorkspaceChannelRequest interface.
 */
export function instanceOfCreateWorkspaceChannelRequest(value: object): value is CreateWorkspaceChannelRequest {
    if (!('name' in value) || value['name'] === undefined) return false;
    return true;
}

export function CreateWorkspaceChannelRequestFromJSON(json: any): CreateWorkspaceChannelRequest {
    return CreateWorkspaceChannelRequestFromJSONTyped(json, false);
}

export function CreateWorkspaceChannelRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateWorkspaceChannelRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
    };
}

export function CreateWorkspaceChannelRequestToJSON(value?: CreateWorkspaceChannelRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'name': value['name'],
    };
}

