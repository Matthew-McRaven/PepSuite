// Implementation influenced by:
// https://stackoverflow.com/a/40682136
// Convert a 1-d array to a 2-d array with a maximum sub-array length of chunkSize.
// Must be a function because I couldn't figure out generics + arrow functions.
export function chunk<T>(array: T[], chunkSize: number) {
  if (chunkSize < 1) throw Error('Chunk size must be positive');

  const chunkedArray: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i += chunkSize) chunkedArray.push(array.slice(i, i + chunkSize));
  return chunkedArray;
}

// Type annotations for the main parseObjectCode(...) function
export interface ParseResult {
  success: boolean
  errorMessage?: string
  parsedBytes?: string[]
}
// eslint-disable-next-line no-unused-vars
export type ParseSignature = (arg0: string) => ParseResult;

// Convert a string that (maybe) contains object code into an array of byte-like strings
export const parseObjectCode: ParseSignature = (maybeCode: string) => {
  let success = true;
  // Check that characters are byte-like. That is the are 1-byte hex numbers or ZZ (object code terminator)
  const maybeBytes = maybeCode.split(/\s/);
  maybeBytes.forEach((maybeByte) => {
    if (!/^[0-9a-fA-FzZ][0-9a-fA-FzZ]$/.exec(maybeByte)) success = false;
  });

  // If any bytes don't match, report failure.
  if (!success) return { success, errorMessage: 'String does not look like bytes.' };
  // If it doesn't terminate in ZZ, report failure.
  if (!/[zZ][zZ]/.exec(maybeBytes[maybeBytes.length - 1])) {
    return { success: false, errorMessage: 'Object code string must terminate in ZZ.' };
  }
  return { success, parsedBytes: maybeBytes };
};

// Joins an array of bytes-like objects into space-delimited lines with bytesPerLine bytes.
// Lines are joined by newlines
export const formatBytesLike = (parsedBytes: string[], bytesPerLine: number) => {
  const chunks = chunk(parsedBytes, bytesPerLine);
  const lines = chunks.map((element) => element.join(' '));
  return lines.join('\n');
};
