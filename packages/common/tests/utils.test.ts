import { isSameOriginAbsoluteUrl, isLaterVersion, BN, Buffer, intToHexString, hexToBytes, bytesToHex } from '../src'

test('isLaterVersion', () => {
  expect(isLaterVersion('', '1.1.0')).toEqual(false)
  expect(isLaterVersion('1.2.0', '1.1.0')).toEqual(true)
  expect(isLaterVersion('1.1.0', '1.1.0')).toEqual(true)
  expect(isLaterVersion('1.1.0', '1.2.0')).toEqual(false)
})

test('isSameOriginAbsoluteUrl', () => {
  expect(isSameOriginAbsoluteUrl('http://example.com', 'http://example.com/')).toEqual(true)
  expect(isSameOriginAbsoluteUrl('https://example.com', 'https://example.com/')).toEqual(true)
  expect(isSameOriginAbsoluteUrl('http://example.com', 'http://example.com/manifest.json')).toEqual(true)
  expect(isSameOriginAbsoluteUrl('https://example.com', 'https://example.com/manifest.json')).toEqual(true)
  expect(isSameOriginAbsoluteUrl('http://localhost:3000', 'http://localhost:3000/manifest.json')).toEqual(true)
  expect(isSameOriginAbsoluteUrl('http://app.example.com', 'http://app.example.com/manifest.json')).toEqual(true)
  expect(isSameOriginAbsoluteUrl('http://app.example.com:80', 'http://app.example.com/manifest.json')).toEqual(true)
  expect(isSameOriginAbsoluteUrl('https://app.example.com:80', 'https://app.example.com:80/manifest.json')).toEqual(true)
  
  expect(isSameOriginAbsoluteUrl('http://example.com', 'https://example.com/')).toEqual(false)
  expect(isSameOriginAbsoluteUrl('http://example.com', 'http://example.com:1234')).toEqual(false)
  expect(isSameOriginAbsoluteUrl('http://app.example.com', 'https://example.com/manifest.json')).toEqual(false)
})

test('BN', () => {
  const intVal = new BN(100);

  expect(intVal.value).toEqual(BigInt(100));
  expect(intVal.toString()).toEqual('100');
  expect(intVal.toNumber()).toEqual(100);
  expect(intVal.toBuffer()).toEqual(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 100]));
  expect(BN.isBN(intVal)).toBeTruthy();
  expect(intVal.gt(new BN(10))).toBeTruthy();
  expect(intVal.lt(new BN(200))).toBeTruthy();
  expect(new BN(Uint8Array.of(0x0a)).value).toEqual(BigInt(10));
  expect(new BN('0x0a').value).toEqual(BigInt(10));
  expect(new BN(0x0a).value).toEqual(BigInt(10));
  expect(new BN(-10).value).toEqual(BigInt(-10));
})

test('intToHexString', () => {
  const expected = '0000000000000010';

  expect(intToHexString(BigInt(16))).toEqual(expected);
  expect(intToHexString(16)).toEqual(expected);
})

test('hexToBytes & bytesToHex', () => {
  const hex = 'ff';
  const bytes = Uint8Array.of(255);

  expect(hexToBytes(hex)).toEqual(bytes);
  expect(bytesToHex(bytes)).toEqual(hex);
})
