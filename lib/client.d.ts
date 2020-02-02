/// <reference types="node" />
/**
 * Every packet has the same structure this is a representation of a response & request.
 * @type RCONPacket
 */
export declare type RCONPacket = {
    size: number;
    id: number;
    type: PacketType;
    body: string;
};
/**
 * These are the "types" of packet responses and requests their names are assigned to their
 * type in short-int form.
 * @enum PacketType
 */
export declare enum PacketType {
    SERVERDATA_RESPONSE_VALUE = 0,
    SERVERDATA_EXECCOMMAND = 2,
    SERVERDATA_AUTH_RESPONSE = 2,
    SERVERDATA_AUTH = 3
}
/**
 * @class Client
 */
export declare class Client {
    private client;
    constructor(host: string, port: number);
    /**
     * This encodes a packet to be used in a TCP request.
     * @param {PacketType} type
     * @param {number} id
     * @param {string} body
     * @returns {Buffer}
     */
    static encode(type: PacketType, id: number, body: string): Buffer;
    /**
     * This decodes a packet into an object
     * @param {Buffer} data
     * @returns {RCONPacket}
     */
    static decode(data: Buffer): RCONPacket;
    /**
     * This sends an authentication request to the RCON server and upon approval this Promise
     * will resolve, otherwise it will reject with the same provided response packet.
     * @param {string} password
     * @returns {Promise<RCONPacket>}
     */
    login(password: string): Promise<RCONPacket>;
    /**
     * This sends commands to the RCON server. If an error occurred (ie authentication error) it
     * will reject with the same response packet.
     * @param {string} cmd
     * @returns {Promise<RCONPacket>}
     */
    command(cmd: string): Promise<RCONPacket>;
    /**
     * Same as logging out. Once the connection is destroyed the authentication must be renewed
     * the next time connected.
     */
    destroy(): void;
}
//# sourceMappingURL=client.d.ts.map