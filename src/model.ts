export const segmentNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g1', 'g2', 'h', 'i', 'j', 'k', 'l', 'm'] as const;

export type SegmentNames = typeof segmentNames;
export type SegmentName = SegmentNames[number];
export type SegmentBlock = [SegmentName, ...SegmentName[]] | SegmentName[] | [];
export type SegmentLine = SegmentBlock[];

export const segmentCodes = {
  '0': ['a', 'b', 'c', 'd', 'e', 'f', 'j', 'k'],
  '1': ['b', 'c', 'j'],
  '2': ['a', 'b', 'd', 'e', 'g1', 'g2'],
  '3': ['a', 'b', 'c', 'd', 'g2'],
  '4': ['b', 'c', 'f', 'g1', 'g2'],
  '5': ['a', 'c', 'd', 'f', 'g1', 'g2'],
  '6': ['a', 'c', 'd', 'e', 'f', 'g1', 'g2'],
  '7': ['a', 'j', 'l'],
  '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g1', 'g2'],
  '9': ['a', 'b', 'c', 'f', 'g1', 'g2'],
  A: ['a', 'b', 'c', 'e', 'f', 'g1', 'g2'],
  B: ['a', 'b', 'c', 'd', 'g2', 'i', 'l'],
  C: ['a', 'd', 'e', 'f'],
  D: ['a', 'b', 'c', 'd', 'i', 'l'],
  E: ['a', 'd', 'e', 'f', 'g1', 'g2'],
  F: ['a', 'e', 'f', 'g1', 'g2'],
  G: ['a', 'c', 'd', 'e', 'f', 'g2'],
  H: ['b', 'c', 'e', 'f', 'g1', 'g2'],
  I: ['a', 'd', 'i', 'l'],
  J: ['b', 'c', 'd', 'e'],
  K: ['e', 'f', 'g1', 'j', 'm'],
  L: ['d', 'e', 'f'],
  M: ['b', 'c', 'e', 'f', 'h', 'j'],
  N: ['b', 'c', 'e', 'f', 'h', 'm'],
  O: ['a', 'b', 'c', 'd', 'e', 'f'],
  P: ['a', 'b', 'e', 'f', 'g1', 'g2'],
  Q: ['a', 'b', 'c', 'd', 'e', 'f', 'm'],
  R: ['a', 'b', 'e', 'f', 'g1', 'g2', 'm'],
  S: ['a', 'c', 'd', 'g2', 'h'],
  T: ['a', 'i', 'l'],
  U: ['b', 'c', 'd', 'e', 'f'],
  V: ['e', 'f', 'j', 'k'],
  W: ['b', 'c', 'e', 'f', 'k', 'm'],
  X: ['h', 'j', 'k', 'm'],
  Y: ['h', 'j', 'l'],
  Z: ['a', 'd', 'j', 'k'],
} satisfies Record<string, SegmentBlock>;

export type SegmentCodes = typeof segmentCodes;
export type KnownChar = keyof SegmentCodes;