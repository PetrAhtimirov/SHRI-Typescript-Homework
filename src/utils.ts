import { SegmentLine } from './model';

export function clampToLength(state: SegmentLine, length: number) {
  return state.concat(emptyDisplays(Math.max(0, length - state.length))).slice(0, length);
}

export function emptyDisplays(amount: number) {
  return Array.from({ length: amount }, () => []);
}

export function carryRight<SomeArg, FirstArgs extends SomeArg[], LastArg, ReturnValue>(
  fn: (...args: [...FirstArgs, LastArg]) => ReturnValue,
  arg: LastArg,
) {
  return (...newArgs: FirstArgs) => fn(...newArgs, arg);
}

export function randomItem<T>(set: Set<T>): T {
  const i = Math.trunc(set.size * Math.random());
  return Array.from(set)[i];
}
