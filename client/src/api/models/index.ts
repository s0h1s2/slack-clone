/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface ChannelMessageResponse
 */
export interface ChannelMessageResponse {
    /**
     * 
     * @type {number}
     * @memberof ChannelMessageResponse
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof ChannelMessageResponse
     */
    message: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelMessageResponse
     */
    attachment: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelMessageResponse
     */
    username: string;
    /**
     * 
     * @type {number}
     * @memberof ChannelMessageResponse
     */
    senderId: number;
    /**
     * 
     * @type {string}
     * @memberof ChannelMessageResponse
     */
    avatar?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ChannelMessageResponse
     */
    createdAt: string;
    /**
     * 
     * @type {string}
     * @memberof ChannelMessageResponse
     */
    updateAt?: string | null;
}
/**
 * 
 * @export
 * @interface ChannelResponse
 */
export interface ChannelResponse {
    /**
     * 
     * @type {number}
     * @memberof ChannelResponse
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof ChannelResponse
     */
    name: string;
}
/**
 * 
 * @export
 * @interface CreateChannelResponse
 */
export interface CreateChannelResponse {
    /**
     * 
     * @type {number}
     * @memberof CreateChannelResponse
     */
    workspaceId: number;
    /**
     * 
     * @type {string}
     * @memberof CreateChannelResponse
     */
    name: string;
}
/**
 * 
 * @export
 * @interface CreateUserRequest
 */
export interface CreateUserRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateUserRequest
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserRequest
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserRequest
     */
    password: string;
}
/**
 * 
 * @export
 * @interface CreateUserResponse
 */
export interface CreateUserResponse {
    /**
     * 
     * @type {number}
     * @memberof CreateUserResponse
     */
    userId: number;
    /**
     * 
     * @type {string}
     * @memberof CreateUserResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserResponse
     */
    email: string;
}
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
 * 
 * @export
 * @interface CreateWorkspaceRequest
 */
export interface CreateWorkspaceRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateWorkspaceRequest
     */
    name: string;
}
/**
 * 
 * @export
 * @interface CreateWorkspaceResponse
 */
export interface CreateWorkspaceResponse {
    /**
     * 
     * @type {number}
     * @memberof CreateWorkspaceResponse
     */
    workspaceId: number;
    /**
     * 
     * @type {string}
     * @memberof CreateWorkspaceResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CreateWorkspaceResponse
     */
    joinCode: string;
}
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
 * 
 * @export
 * @interface GetChannelResponse
 */
export interface GetChannelResponse {
    /**
     * 
     * @type {number}
     * @memberof GetChannelResponse
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof GetChannelResponse
     */
    name: string;
}
/**
 * 
 * @export
 * @interface GetChannelsResponse
 */
export interface GetChannelsResponse {
    /**
     * 
     * @type {Array<GetChannelResponse>}
     * @memberof GetChannelsResponse
     */
    channels: Array<GetChannelResponse>;
}
/**
 * 
 * @export
 * @interface GetMember
 */
export interface GetMember {
    /**
     * 
     * @type {number}
     * @memberof GetMember
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof GetMember
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof GetMember
     */
    avatar?: string | null;
}
/**
 * 
 * @export
 * @interface GetUserWorkspaceResponse
 */
export interface GetUserWorkspaceResponse {
    /**
     * 
     * @type {number}
     * @memberof GetUserWorkspaceResponse
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof GetUserWorkspaceResponse
     */
    name: string;
}
/**
 * 
 * @export
 * @interface GetUserWorkspacesResponse
 */
export interface GetUserWorkspacesResponse {
    /**
     * 
     * @type {Array<GetUserWorkspaceResponse>}
     * @memberof GetUserWorkspacesResponse
     */
    workspaces: Array<GetUserWorkspaceResponse>;
}
/**
 * 
 * @export
 * @interface GetWorkspacePublicInfoResponse
 */
export interface GetWorkspacePublicInfoResponse {
    /**
     * 
     * @type {string}
     * @memberof GetWorkspacePublicInfoResponse
     */
    name: string;
}
/**
 * 
 * @export
 * @interface GetWorkspaceResponse
 */
export interface GetWorkspaceResponse {
    /**
     * 
     * @type {number}
     * @memberof GetWorkspaceResponse
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof GetWorkspaceResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof GetWorkspaceResponse
     */
    joinCode: string;
    /**
     * 
     * @type {boolean}
     * @memberof GetWorkspaceResponse
     */
    isAdmin: boolean;
    /**
     * 
     * @type {Array<GetMember>}
     * @memberof GetWorkspaceResponse
     */
    members: Array<GetMember>;
}
/**
 * 
 * @export
 * @interface JoinCodeResponse
 */
export interface JoinCodeResponse {
    /**
     * 
     * @type {string}
     * @memberof JoinCodeResponse
     */
    joinCode: string;
}
/**
 * 
 * @export
 * @interface JoinWorkspaceRequest
 */
export interface JoinWorkspaceRequest {
    /**
     * 
     * @type {string}
     * @memberof JoinWorkspaceRequest
     */
    joinCode: string;
}
/**
 * 
 * @export
 * @interface LoginRequest
 */
export interface LoginRequest {
    /**
     * 
     * @type {string}
     * @memberof LoginRequest
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof LoginRequest
     */
    password: string;
}
/**
 * 
 * @export
 * @interface LoginResponse
 */
export interface LoginResponse {
    /**
     * 
     * @type {string}
     * @memberof LoginResponse
     */
    token: string;
}
/**
 * 
 * @export
 * @interface MeResponse
 */
export interface MeResponse {
    /**
     * 
     * @type {string}
     * @memberof MeResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof MeResponse
     */
    email: string;
}
/**
 * 
 * @export
 * @interface ProblemDetails
 */
export interface ProblemDetails {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    type?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    title?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ProblemDetails
     */
    status?: number | null;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    detail?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProblemDetails
     */
    instance?: string | null;
}
/**
 * 
 * @export
 * @interface ValidationProblemDetails
 */
export interface ValidationProblemDetails {
    [key: string]: any | any;
    /**
     * 
     * @type {string}
     * @memberof ValidationProblemDetails
     */
    type?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ValidationProblemDetails
     */
    title?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ValidationProblemDetails
     */
    status?: number | null;
    /**
     * 
     * @type {string}
     * @memberof ValidationProblemDetails
     */
    detail?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ValidationProblemDetails
     */
    instance?: string | null;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof ValidationProblemDetails
     */
    errors: { [key: string]: Array<string>; };
}
