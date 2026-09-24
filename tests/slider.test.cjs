const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const { JSDOM } = require('jsdom');

require.extensions['.tsx'] = (module, filename) => {
  const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS }
  });
  module._compile(result.outputText, filename);
};

test('slider wraps, selects images, handles keyboard, pauses on focus and cleans up timers', async () => {
  const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost', pretendToBeVisual: true });
  global.window = dom.window;
  global.document = dom.window.document;
  global.IS_REACT_ACT_ENVIRONMENT = true;
  let tick;
  let cleared = 0;
  window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  global.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; }
    observe() { this.callback([{ isIntersecting: true }]); }
    disconnect() {}
  };
  window.setInterval = (callback) => { tick = callback; return 1; };
  window.clearInterval = () => { cleared++; tick = undefined; };
  const { act } = require('react');
  const { createRoot } = require('react-dom/client');
  const { ImageSlider } = require('../components/image-slider.tsx');
  const React = require('react');
  const root = createRoot(document.getElementById('root'));
  const button = (label) => document.querySelector(`button[aria-label="${label}"]`);
  const click = async (element) => act(() => element.click());
  const activeTitle = () => document.querySelector('.slider-slide.is-active h3').textContent;
  try {
    await act(() => root.render(React.createElement(ImageSlider)));
    assert.equal(activeTitle(), 'A beautiful beginning');
    assert.equal(tick, undefined, 'does not autoplay unexpectedly');
    await click(button('Previous image'));
    assert.equal(activeTitle(), 'Celebrate the little joys');
    await click(button('Next image'));
    assert.equal(activeTitle(), 'A beautiful beginning');
    await click(button('Show image 3: An unforgettable welcome'));
    assert.equal(activeTitle(), 'An unforgettable welcome');
    await act(() => button('Next image').dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })));
    assert.equal(activeTitle(), 'Together, in golden light');
    await click(button('Play slideshow'));
    assert.equal(typeof tick, 'function');
    await act(() => tick());
    assert.equal(activeTitle(), 'An unforgettable welcome');
    await act(() => button('Next image').dispatchEvent(new window.FocusEvent('focusin', { bubbles: true })));
    assert.ok(button('Play slideshow'), 'keyboard focus pauses rotation');
    assert.equal(tick, undefined);
    assert.equal(document.querySelectorAll('.slider-slide[aria-hidden="false"]').length, 1);
    await click(button('Play slideshow'));
    await act(() => root.unmount());
    assert.equal(tick, undefined, 'unmount clears interval');
    assert.ok(cleared >= 2);
  } finally { dom.window.close(); }
});
