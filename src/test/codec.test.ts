import {decode, encode, PacketType} from "../codec";

describe('codec', () => {
    const encoded = encode(PacketType.SERVERDATA_AUTH, 22, 'password');
    it('decode', () => {
        const decoded = decode(encoded);
        expect(decoded.id).toBe(22);
        expect(decoded.type).toBe(PacketType.SERVERDATA_AUTH);
        expect(decoded.body).toBe('password');
        expect(decoded.size).toBe(18);
    });
});