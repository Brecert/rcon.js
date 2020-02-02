/**
 * @module Client
 * @author Dylan Hackworth <https://github.com/dylhack>
 * @LICENSE
 * Copyright (c) 2019 Dylan Hackworth. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions
 * and the following disclaimer.

 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of
 *  conditions and the following disclaimer in the documentation and/or other materials provided
 *  with the distribution. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 *  EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 *  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import * as net from 'net';
/**
 * These are the "types" of packet responses and requests their names are assigned to their
 * type in short-int form.
 * @enum PacketType
 */
export var PacketType;
(function (PacketType) {
    PacketType[PacketType["SERVERDATA_RESPONSE_VALUE"] = 0] = "SERVERDATA_RESPONSE_VALUE";
    PacketType[PacketType["SERVERDATA_EXECCOMMAND"] = 2] = "SERVERDATA_EXECCOMMAND";
    PacketType[PacketType["SERVERDATA_AUTH_RESPONSE"] = 2] = "SERVERDATA_AUTH_RESPONSE";
    PacketType[PacketType["SERVERDATA_AUTH"] = 3] = "SERVERDATA_AUTH";
})(PacketType || (PacketType = {}));
/**
 * @class Client
 */
export class Client {
    constructor(host, port) {
        this.client = net.createConnection({ host, port });
    }
    /**
     * This encodes a packet to be used in a TCP request.
     * @param {PacketType} type
     * @param {number} id
     * @param {string} body
     * @returns {Buffer}
     */
    static encode(type, id, body) {
        let size = Buffer.byteLength(body) + 14, packet = Buffer.alloc(size);
        packet.writeInt32LE(size - 4, 0);
        packet.writeInt32LE(id, 4);
        packet.writeInt32LE(type, 8);
        packet.write(body, 12, size - 2, "ascii");
        packet.writeInt16LE(0, size - 2);
        return packet;
    }
    /**
     * This decodes a packet into an object
     * @param {Buffer} data
     * @returns {RCONPacket}
     */
    static decode(data) {
        return {
            size: data.readInt32LE(0),
            id: data.readInt32LE(4),
            type: data.readInt32LE(8),
            body: data.toString("ascii", 12, data.length - 2)
        };
    }
    /**
     * This sends an authentication request to the RCON server and upon approval this Promise
     * will resolve, otherwise it will reject with the same provided response packet.
     * @param {string} password
     * @returns {Promise<RCONPacket>}
     */
    login(password) {
        return new Promise((resolve, reject) => {
            const encoded = Client.encode(PacketType.SERVERDATA_AUTH, 22, password);
            this.client.once('data', (chunk) => {
                const decoded = Client.decode(chunk);
                if (decoded.id === -1)
                    reject(decoded);
                else
                    resolve(decoded);
            });
            this.client.write(encoded);
        });
    }
    /**
     * This sends commands to the RCON server. If an error occurred (ie authentication error) it
     * will reject with the same response packet.
     * @param {string} cmd
     * @returns {Promise<RCONPacket>}
     */
    command(cmd) {
        return new Promise((resolve, reject) => {
            const encoded = Client.encode(PacketType.SERVERDATA_EXECCOMMAND, 53, cmd);
            this.client.once('data', (chunk) => {
                const decoded = Client.decode(chunk);
                if (decoded.type != PacketType.SERVERDATA_RESPONSE_VALUE)
                    reject(decoded);
                else
                    resolve(decoded);
            });
            this.client.write(encoded);
        });
    }
    /**
     * Same as logging out. Once the connection is destroyed the authentication must be renewed
     * the next time connected.
     */
    destroy() {
        this.client.destroy();
    }
}
