import { blink, marquee, mix, typing } from './effects';
import { SegmentBlock, SegmentLine, segmentNames } from './model';
import { carryRight } from './utils';

type domOptionsType = {
  className: string,
  templateId: string,
};


export function isElement(element: Node): element is HTMLElement {
  return element.nodeType === 1;
}
export function isTemplateNode(element: Node): element is HTMLTemplateElement {
  return isElement(element) && element.nodeName === 'TEMPLATE';
}
export function imageCreator(templateId: string) {
  const templateElement = document.getElementById(templateId);
  if (!templateElement) return null;
  if (!isTemplateNode(templateElement)) return null;
  const clone = () => templateElement.content.cloneNode(true);
  return clone;
}
export function checkNonNullable<T>(value: T | null): asserts value is T {
  if (value === null) {
    throw new Error('value is null');
  }
}
export function makeDisplays(amount: number, parentElement: HTMLElement, domOptions: domOptionsType) {
  const displays = [...parentElement.querySelectorAll(`.${domOptions.className}`)];
  for (let i = displays.length - 1; i >= amount; i -= 1) {
    displays[i].remove();
    displays.pop();
  }
  const getImage = imageCreator(domOptions.templateId);
  while (getImage && displays.length < amount) {
    const display = getImage();
    parentElement.append(display);
    const last: (Node | null) = parentElement.lastChild;
    if (last && isElement(last)) displays.push(last);
  }
  return displays;
}
export function updateDisplay(segments: SegmentBlock, display: Element) {
  for (const segmentName of segmentNames) {
    display.classList.remove(segmentName);
  }
  for (const segmentName of segments) {
    display.classList.add(segmentName);
  }
}
export function updateDisplayBlock(segments: SegmentLine, parentElement: HTMLElement, domOptions: domOptionsType) {
  const displays = makeDisplays(segments.length, parentElement, domOptions);
  segments.forEach((segment, i: number) => {
    updateDisplay(segment, displays[i]);
  });
}
function startAnimationBuilder<T, Frame>(frameBuffers: Map<T, Frame[]>) {
  return function start(frames: Frame[], parent: T) {
    frameBuffers.set(parent, [...frames].reverse());
  };
}
export function initAnimation(domOptions: domOptionsType) {
  const frameDelay = 100;
  const frameBuffers = new Map<HTMLElement, SegmentLine[]>();
  function animateFrame() {
    for (const [parent, frameBuffer] of frameBuffers) {
      if (frameBuffer.length) {
        const block = frameBuffer.pop();
        if (!block) return;
        updateDisplayBlock(block, parent, domOptions);
      } else {
        frameBuffers.delete(parent);
      }
    }
  }
  setInterval(animateFrame, frameDelay);
  return startAnimationBuilder(frameBuffers);
}
export function animateTyping(text: string, element: HTMLElement, start: (frames: SegmentLine[], parent: Node) => void) {
  const frames = typing(text, { convertToUpperCase: true });
  start(frames, element);
}
export function animateBlink(text: string, element: HTMLElement, start: (frames: SegmentLine[], parent: Node) => void) {
  const frames = blink(text, 12);
  start(frames, element);
}
export function animateMarquee(text: string, element: HTMLElement, start: (frames: SegmentLine[], parent: Node) => void) {
  const frames = marquee(text);
  start(frames, element);
}
export function animateMix(text: string, element: HTMLElement, start: (frames: SegmentLine[], parent: Node) => void) {
  const frames = mix(text);
  start(frames, element);
}

// type AnimationFunction = (text: string, element: HTMLElement, start: (frames: SegmentName[][], parent: HTMLElement) => void) => void;

type AnimationSet = {
  typing: (text: string, element: HTMLElement) => void;
  blink: (text: string, element: HTMLElement) => void;
  marquee: (text: string, element: HTMLElement) => void;
  mix: (text: string, element: HTMLElement) => void;
};

type AnimationWrappers = {
  typing: () => void;
  blink: () => void;
  marquee: () => void;
  mix: () => void;
};


export function getDefaultAnimations(start: (frames: SegmentLine[], parent: Node) => void): AnimationSet {
  return {
    typing: carryRight(animateTyping, start),
    blink: carryRight(animateBlink, start),
    marquee: carryRight(animateMarquee, start),
    mix: carryRight(animateMix, start),
  };
}

export function getDefaultAnimationsWrappers(animations: AnimationSet, target: HTMLElement, input: HTMLInputElement): AnimationWrappers {
  return {
    typing: () => carryRight(animations.typing, target)(input.value),
    blink: () => carryRight(animations.blink, target)(input.value),
    marquee: () => carryRight(animations.marquee, target)(input.value),
    mix: () => carryRight(animations.mix, target)(input.value),
  };
}
