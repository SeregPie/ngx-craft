import {describe, expect, it, jest} from '@jest/globals';

import {DOCUMENT, inject} from '@angular/core';
import {TestBed} from '@angular/core/testing';

describe('useMediaQuery', () => {
  it('...', async () => {
    const document = TestBed.inject(DOCUMENT);
    const window = document.defaultView;
    if (window != null) {
      console.log(window.matchMedia, window.matchMedia('(prefers-color-scheme: dark)'), window.MediaQueryList);
    }
  });
});
