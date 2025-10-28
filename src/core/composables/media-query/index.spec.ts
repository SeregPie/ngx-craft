import {DOCUMENT, inject} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {describe, expect, it, jest} from '@jest/globals';

describe.skip('useMediaQuery', () => {
  it('...', async () => {
    const document = TestBed.inject(DOCUMENT);
    const window = document.defaultView;
    if (window != null) {
      console.log(window.matchMedia, window.matchMedia('(prefers-color-scheme: dark)'), window.MediaQueryList);
    }
  });
});
