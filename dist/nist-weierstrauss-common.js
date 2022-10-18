"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicKeyIntToUint8ArrayPointPair = exports.publicKeyIntToXY = exports.testUint8Array = exports.testHexString = exports.publicKeyHexToUint8ArrayPointPair = exports.publicKeyToXY = exports.pubKeyBytesToHex = void 0;
const u8a = require("uint8arrays");
const base64_1 = require("multiformats/bases/base64");
function pubKeyBytesToHex(pubKeyBytes) {
    if (!testUint8Array(pubKeyBytes)) {
        throw new TypeError("input must be a Uint8Array");
    }
    const bbf = u8a.toString(pubKeyBytes, "base16");
    return bbf;
}
exports.pubKeyBytesToHex = pubKeyBytesToHex;
function publicKeyToXY(publicKeyHex) {
    if (!testHexString(publicKeyHex)) {
        throw new TypeError("input must be string with characters 0-9,A-F,a-f");
    }
    const u8aOctetPoint = publicKeyHexToUint8ArrayPointPair(publicKeyHex);
    const xm = base64_1.base64url.encode(u8aOctetPoint.xOctet).slice(1);
    const ym = base64_1.base64url.encode(u8aOctetPoint.yOctet).slice(1);
    return { xm, ym };
}
exports.publicKeyToXY = publicKeyToXY;
function publicKeyHexToUint8ArrayPointPair(publicKeyHex) {
    if (!testHexString(publicKeyHex)) {
        throw new TypeError("input must be string with characters 0-9,A-F,a-f");
    }
    const xHex = publicKeyHex.slice(0, publicKeyHex.length / 2);
    const yHex = publicKeyHex.slice(publicKeyHex.length / 2, publicKeyHex.length);
    const xOctet = u8a.fromString(xHex, "base16");
    const yOctet = u8a.fromString(yHex, "base16");
    return { xOctet, yOctet };
}
exports.publicKeyHexToUint8ArrayPointPair = publicKeyHexToUint8ArrayPointPair;
function testHexString(str) {
    const regex = /^[A-Fa-f0-9]+$/i;
    if (regex.exec(str) !== null && regex.test(str) && typeof str == "string") {
        return true;
    }
    return false;
}
exports.testHexString = testHexString;
function testUint8Array(param) {
    if (param == null) {
        return false;
    }
    if (param.constructor === Uint8Array) {
        return true;
    }
    else {
        return false;
    }
}
exports.testUint8Array = testUint8Array;
function publicKeyIntToXY(ecpoint) {
    if (ecpoint == null) {
        throw new TypeError("input cannot be null or undefined.");
    }
    if (typeof ecpoint !== "object") {
        throw new TypeError("Input must be an object with properties x and y");
    }
    if (!Object.prototype.hasOwnProperty.call(ecpoint, "x") ||
        !Object.prototype.hasOwnProperty.call(ecpoint, "y")) {
        throw new Error("Input must have properties x and y");
    }
    if (typeof ecpoint.x !== "bigint" && typeof ecpoint.y !== "bigint") {
        throw new Error("Input coordinates must be BigInt");
    }
    const u8aOctetPoint = publicKeyIntToUint8ArrayPointPair(ecpoint);
    const xm = base64_1.base64url.encode(u8aOctetPoint.xOctet).slice(1);
    const ym = base64_1.base64url.encode(u8aOctetPoint.yOctet).slice(1);
    return { xm, ym };
}
exports.publicKeyIntToXY = publicKeyIntToXY;
function publicKeyIntToUint8ArrayPointPair(ecpoint) {
    if (ecpoint == null) {
        throw new TypeError("input cannot be null or undefined.");
    }
    if (typeof ecpoint !== "object") {
        throw new TypeError("Input must be an object with properties x and y");
    }
    if (!Object.prototype.hasOwnProperty.call(ecpoint, "x") ||
        !Object.prototype.hasOwnProperty.call(ecpoint, "y")) {
        throw new Error("Input must have properties x and y");
    }
    if (typeof ecpoint.x !== "bigint" && typeof ecpoint.y !== "bigint") {
        throw new Error("Input coordinates must be BigInt");
    }
    const xHex = ecpoint.x.toString();
    const yHex = ecpoint.y.toString();
    const xOctet = u8a.fromString(xHex, "base10");
    const yOctet = u8a.fromString(yHex, "base10");
    return { xOctet, yOctet };
}
exports.publicKeyIntToUint8ArrayPointPair = publicKeyIntToUint8ArrayPointPair;
//# sourceMappingURL=nist-weierstrauss-common.js.map