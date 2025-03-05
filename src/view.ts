import { KnownChar, SegmentBlock, SegmentLine, segmentCodes } from './model';

export function isKnownChar(char: string): char is KnownChar {
  return char in segmentCodes;
}

export type Options = {
  convertToUpperCase?: boolean;
  unknownChar?: 'exception' | SegmentBlock;
};

export function charToDisplay(char: string, options?: Options): SegmentBlock {
  if (options?.convertToUpperCase) {
    char = char.toUpperCase();
  }
  if (!isKnownChar(char)) {
    if (options?.unknownChar === 'exception') {
      throw new Error(`Cannot convert character ${char} to 14-segment display`);
    }
    return options?.unknownChar ?? [];
  }
  return segmentCodes[char];
}

export function stringToDisplay(input: string, options?: Options): SegmentLine {
  return [...input].map(c => charToDisplay(c, options));
}

export function stringToDisplayArea(input: string, options?: Options) {
  return input.split('\n').map(line => stringToDisplay(line, options));
}
