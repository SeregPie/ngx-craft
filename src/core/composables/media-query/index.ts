// @ts-nocheck

import {DOCUMENT, inject} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {describe, expect, it, jest} from 'vitest';
import {MaybeSignal} from '../../basics/signal-conversion';

const MediaQueryList_inherits_EventTarget = 'MediaQueryList inherits EventTarget';

export function isSupported(): false | Record<string, any> {
  let document = inject(DOCUMENT, {optional: true});
  if (document != null) {
    let window = document.defaultView;
    if (window != null) {
      let {EventTarget, MediaQueryList, MediaQueryListEvent} = window;
      if (window.matchMedia != null && MediaQueryList != null) {
        let compatibility: Record<string, any> = {};
        if (EventTarget != null && MediaQueryListEvent != null && MediaQueryList.prototype instanceof EventTarget) {
          compatibility['MediaQueryList inherits EventTarget'] = true;
        }
        return compatibility;
      }
    }
  }
  return false;
}

export function foo() {
  let document = inject(DOCUMENT, {optional: true});
  if (document != null) {
    let window = document.defaultView;
    if (window != null) {
      let {EventTarget, MediaQueryList, MediaQueryListEvent} = window;
      return {document, window, EventTarget, MediaQueryList, MediaQueryListEvent};
    }
  }
}

export function useMediaQuery(query: MaybeSignal<string>): Signal<boolean> {
  let;
}
