import { formatBytesLike } from '.';
import { parseObjectCode, chunk } from './ObjectCodeParser';

describe('Array Chunking', () => {
  it('handles single chunk smaller thank chunk size', () => {
    const chunked = chunk([10, 20, 30], 4);
    expect(chunked.length).toBe(1);
    expect(chunked[0]?.length).toBe(3);
  });

  it('handles chunk size + 1', () => {
    const chunked = chunk([10, 20, 30], 2);
    expect(chunked.length).toBe(2);
    expect(chunked[0]?.length).toBe(2);
    expect(chunked[1]?.length).toBe(1);
  });

  it('handles exact multiples of chunk size', () => {
    const chunked = chunk([10, 20, 30, 40], 2);
    expect(chunked.length).toBe(2);
    expect(chunked[0]?.length).toBe(2);
    expect(chunked[1]?.length).toBe(2);
  });

  it('handles empty arrays', () => {
    const chunked = chunk([], 2);
    expect(chunked.length).toBe(0);
  });

  it('rejects negative chunk sizes', () => {
    expect(() => { chunk([10, 20, 30], -1); }).toThrow();
  });
});

describe('Object Code Parser', () => {
  it('parses bytes code that is less than one line long', () => {
    const parseResult = parseObjectCode('00 11 22 33 ZZ');
    expect(parseResult.success).toBeTruthy;
    expect(parseResult.errorMessage).toBeUndefined();
    expect(parseResult.parsedBytes).not.toBeUndefined();
    expect(parseResult.parsedBytes?.length).toBe(5);
  });

  it('reject non-object code character', () => {
    const parseResult = parseObjectCode('00 JJ ZZ');
    expect(parseResult.success).toBeFalsy();
  });

  it('requires characters come in pairs of two', () => {
    const extraChar = parseObjectCode('000 ZZ');
    expect(extraChar.success).toBeFalsy();

    const joinedBytes = parseObjectCode('0000 ZZ');
    expect(joinedBytes.success).toBeFalsy();
  });

  it('requires terminating ZZ', () => {
    const parseResult = parseObjectCode('00 JJ');
    expect(parseResult.success).toBeFalsy();
  });
});

describe('Object Code Formatter', () => {
  const bytes = ['00', '11', '22', '33', '44', '55'];
  it('handles single lines', () => {
    const formatResult = formatBytesLike(bytes, 6);
    expect(formatResult).toBe('00 11 22 33 44 55');
  });

  it('handles multiple newlines', () => {
    const formatResult = formatBytesLike(bytes, 2);
    expect(formatResult).toBe('00 11\n22 33\n44 55');
  });

  it('handles empty arrays', () => {
    const formatResult = formatBytesLike([], 2);
    expect(formatResult).toBe('');
  });
});
