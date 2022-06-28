window.matchMedia =
  window.matchMedia ||
  (() => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  });

// jsdom ne supporte pas closest. Il faut faire un polyfill
if (!window.Element.prototype.closest) {
  window.Element.prototype.closest = function (selector) {
    var el = this;
    while (el) {
      if (el.matches(selector)) {
        return el;
      }
      el = el.parentElement;
    }
  };
}

// polyfill pour jsdom
window.HTMLMediaElement.prototype.load = () => {};
window.HTMLMediaElement.prototype.play = () => {};

window.MutationObserver =
  window.MutationObserver ||
  class {
    observe() {}
    disconnect() {}
  };

// polyfill pour screenful.

[
  'requestFullscreen',
  'exitFullscreen',
  'fullscreenElement',
  'fullscreenEnabled',
  'fullscreenchange',
  'fullscreenerror',
].forEach((fn) => {
  document[fn] = document[fn] || (() => {});
});
