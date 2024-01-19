import Long from "long";

const windowsTickEpoch = Long.fromInt(621355968).multiply(100000);

export function readString(buf: Buffer, offset: number) {
    if (buf[offset++] != 11) {
        return {
            str: "",
            length: 1
        };
    }

    const strlen = decode(buf.slice(offset));
    const bytesLen = strlen.length + strlen.value;
    const str = buf.toString("utf-8", offset + strlen.length, offset + bytesLen);

    return {
        str: str,
        length: bytesLen + 1
    };
}

export function createString(str: string) {
    const strlen128 = encode(str.length);
    const strBuf = Buffer.alloc(1 + strlen128.length + str.length);
    strBuf[0] = 0x0b;
    for (let i = 0; i < strlen128.length; i++) strBuf[i + 1] = strlen128[i];
    strBuf.write(str, 1 + strlen128.length);
    return strBuf;
}

export function readLongStr(buf: Buffer, offset: number) {
    const l1 = buf.readInt32LE(offset);
    const l2 = buf.readInt32LE(offset + 4);
    return new Long(l1, l2).toString();
}

export function createLongStr(str: string) {
    const buf = Buffer.alloc(8);
    const l = Long.fromString(str + "");
    buf.writeInt32LE(l.getLowBits(), 0);
    buf.writeInt32LE(l.getHighBits(), 4);
    return buf;
}

export function winTickToMs(num: string) {
    const l = Long.fromString(num + "");
    if (l.compare(0) === 0) return 0;
    return l.divide(10000).subtract(windowsTickEpoch).toNumber();
}



function encode(num: number) {
    const arr = [];
    let len = 0;

    if (num === 0)
        return [0];

    while (num > 0) {
        arr[len] = num & 0x7F;
        if (num >>= 7) arr[len] |= 0x80;
        len++;
    }

    return arr;
}

function decode(arr: any) {
    let total = 0;
    let shift = 0;
    let len = 0;

    while (true) {
        var byte = arr[len];
        len++;
        total |= ((byte & 0x7F) << shift);
        if ((byte & 0x80) === 0) break;
        shift += 7;
    }

    return {
        value: total,
        length: len
    };
}