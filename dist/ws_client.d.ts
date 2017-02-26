/**
 * A WebSocket client
 */
export declare class WsClient {
    ws?: WebSocket;
    WsClient(): void;
    connect(urn: string): void;
    disconnect(): void;
    sendMsg(msg: string): void;
    private onclose(wsClientThis);
}
