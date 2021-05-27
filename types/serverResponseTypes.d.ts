export interface ServerResponse {
    code:number,
    payload:object
}

export interface Error extends ServerResponse {
    payload: {
        status: number,
        message: string,
        redirect: string
    }
}