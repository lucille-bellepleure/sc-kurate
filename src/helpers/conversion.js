import base32Encode from 'base32-encode'
import base32Decode from 'base32-decode'
import * as utf8 from 'utf8-encoder'

const base32Variant = 'Crockford'

export const encodeId = (buffer) => base32Encode(buffer, base32Variant)
export const decodeId = (id) => {
	// console.log('decodeId', {id})
	return new Uint8Array(base32Decode(id, base32Variant))
}

export const numbersToByteArray = (numbers, size?) => {
	if (size == null) {
		return new Uint8Array(numbers)
	}
	if (numbers.length >= size) {
		return numbersToByteArray(numbers.slice(0, size))
	}
	const bytes = new Uint8Array(size)
	bytes.set(numbers, size - numbers.length)
	return bytes
}

export const byteArrayToHex = (byteArray, withPrefix = true) => {
	const prefix = withPrefix ? '0x' : ''
	return (
		prefix +
		Array.from(byteArray, (byte) => {
			return ('0' + (byte & 0xff).toString(16)).slice(-2)
		}).join('')
	)
}

export const byteArrayToNumbers = (bytes) => bytes.reduce((prev, curr) => [...prev, curr], [])
export const hexPrefix = '0x'
export const toHex = (byteArray, withPrefix = true) =>
	(withPrefix ? hexPrefix : '') + Array.from(byteArray, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('')

export const hexToNumbers = (hex) => {
	const hexWithoutPrefix = hex.startsWith('0x') ? hex.slice(2) : hex
	const subStrings = []
	for (let i = 0; i < hexWithoutPrefix.length; i += 2) {
		subStrings.push(hexWithoutPrefix.substr(i, 2))
	}
	return subStrings.map((s) => parseInt(s, 16))
}
export const hexToByteArray = (hex, size?) => numbersToByteArray(hexToNumbers(hex), size)
export const stripHexPrefix = (hex) => (hex.startsWith(hexPrefix) ? hex.slice(hexPrefix.length) : hex)
export const stringToUint8Array = (data) => utf8.fromString(data)
