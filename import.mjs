//  Copyright 2024 International Digital Economy Academy
// 
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
// 
//  http://www.apache.org/licenses/LICENSE-2.0
// 
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

// @ts-check
const log = (() => {
  /** @type {number[]} buffer */
  let buffer = [];
  function flush() {
      if (buffer.length > 0) {
          console.log(new TextDecoder("utf-16").decode(new Uint16Array(buffer).valueOf()));
          buffer = [];
      }
  }
  /** @param {number} ch */
  function log(ch) {
      if (ch == '\n'.charCodeAt(0)) { flush(); }
      else if (ch == '\r'.charCodeAt(0)) { /* noop */ }
      else { buffer.push(ch); }
  }
  return log
})();

/** @type {WebAssembly.Imports} */
export default {
  "peter-jerry-ye:canvas/Canvas2D": {
      /** @type { (canvas: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => void} */
      strokeRect: (canvas, x, y, width, height) => { canvas.strokeRect(x, y, width, height) },
      /** @type { (canvas: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => void} */
      fillRect: (canvas, x, y, width, height) => { canvas.fillRect(x, y, width, height) },
      /** @type { (canvas: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => void} */
      clearRect: (canvas, x, y, width, height) => { canvas.clearRect(x, y, width, height) },
      /** @type { (canvas: CanvasRenderingContext2D) => void} */
      beginPath: (canvas) => { canvas.beginPath() },
      /** @type { (canvas: CanvasRenderingContext2D) => void} */
      closePath: (canvas) => { canvas.closePath() },
      /** @type { (canvas: CanvasRenderingContext2D, x: number, y: number) => void} */
      moveTo: (canvas, x, y) => { canvas.moveTo(x, y) },
      /** @type { (canvas: CanvasRenderingContext2D, x: number, y: number) => void} */
      lineTo: (canvas, x, y) => { canvas.lineTo(x, y) },
      /** @type { (canvas: CanvasRenderingContext2D, path2d: Path2D | undefined) => void} */
      stroke: (canvas, path2d) => { path2d ? canvas.stroke(path2d) : canvas.stroke() },
      /** @type { (canvas: CanvasRenderingContext2D, fillRule: CanvasFillRule | undefined) => void} */
      fill: (canvas, fillRule) => { canvas.fill(fillRule) },
      /** @type { (canvas: CanvasRenderingContext2D, path2d: Path2D, fillRule: CanvasFillRule | undefined) => void} */
      fill_path: (canvas, path2d, fillRule) => { canvas.fill(path2d, fillRule) },
      /** @type { (canvas: CanvasRenderingContext2D, text: String, x: number, y: number, maxWidth: number | undefined) => void} */
      fillText: (canvas, text, x, y, maxWidth) => { canvas.fillText(text, x, y, maxWidth) },
      /** @type { (canvas: CanvasRenderingContext2D, text: String, x: number, y: number, maxWidth: number | undefined) => void} */
      strokeText: (canvas, text, x, y, maxWidth) => { canvas.strokeText(text, x, y, maxWidth) },
      /** @type { (canvas: CanvasRenderingContext2D) => number} */
      get_lineWidth: (canvas) => canvas.lineWidth,
      /** @type { (canvas: CanvasRenderingContext2D, width: number) => void} */
      set_lineWidth: (canvas, width) => { canvas.lineWidth = width },
      /** @type { (canvas: CanvasRenderingContext2D) => CanvasLineCap} */
      get_lineCap: (canvas) => canvas.lineCap,
      /** @type { (canvas: CanvasRenderingContext2D, cap: CanvasLineCap) => void} */
      set_lineCap: (canvas, cap) => { canvas.lineCap = cap },
      /** @type { (canvas: CanvasRenderingContext2D) => CanvasLineJoin} */
      get_lineJoin: (canvas) => canvas.lineJoin,
      /** @type { (canvas: CanvasRenderingContext2D, join: CanvasLineJoin) => void} */
      set_lineJoin: (canvas, join) => { canvas.lineJoin = join },
      /** @type { (canvas: CanvasRenderingContext2D) => number} */
      get_miterLimit: (canvas) => canvas.miterLimit,
      /** @type { (canvas: CanvasRenderingContext2D, limit: number) => void} */
      set_miterLimit: (canvas, limit) => { canvas.miterLimit = limit },
      /** @type { (canvas: CanvasRenderingContext2D) => number[]} */
      getLineDash: (canvas) => canvas.getLineDash(),
      /** @type { (canvas: CanvasRenderingContext2D, segments: Iterable<number>) => void} */
      setLineDash: (canvas, segments) => { canvas.setLineDash(segments) },
      /** @type { (canvas: CanvasRenderingContext2D, style: string | CanvasGradient | CanvasPattern) => void} */
      set_stroke_style: (canvas, style) => { canvas.strokeStyle = style },
      /** @type { (canvas: CanvasRenderingContext2D, style: string | CanvasGradient | CanvasPattern) => void} */
      set_fill_style: (canvas, style) => { canvas.fillStyle = style },
      /** @type { (canvas: CanvasRenderingContext2D, font: string) => void} */
      set_font: (canvas, font) => { canvas.font = font },
      /** @type { (canvas: CanvasRenderingContext2D, image: CanvasImageSource, dx: number, dy: number) => void} */
      drawImage: (canvas, image, dx, dy) => { canvas.drawImage(image, dx, dy) },
      /** @type { (canvas: CanvasRenderingContext2D, image: CanvasImageSource, dx: number, dy: number, dWidth: number, dHeight: number) => void} */
      drawImage_dim: (canvas, image, dx, dy, dWidth, dHeight) => { canvas.drawImage(image, dx, dy, dWidth, dHeight) },
      /** @type { (canvas: CanvasRenderingContext2D, image: CanvasImageSource, sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: number) => void} */
      drawImage_sub: (canvas, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) => { canvas.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) },
      /** @type { (canvas: CanvasRenderingContext2D, x: number, y: number) => void} */
      scale: (canvas, x, y) => { canvas.scale(x, y) }
  },
  "peter-jerry-ye:canvas/HTMLImageElement": {
      /** @type { (width: number | undefined, height: number | undefined) => HTMLImageElement} */
      new: (width, height) => new Image(width, height),
      /** @type { (image: HTMLImageElement, src: String) => void} */
      set_src: (image, src) => { image.src = src },
  },
  "peter-jerry-ye:canvas/String": {
      /** @type { (str: String) => number} */
      length: (str) => str.length,
      /** @type {(offset: number, length: number) => string} */
      load: (offset, length) => {
          const bytes = new Uint16Array(globalThis["peter-jerry-ye:canvas"].memory.buffer, offset, length);
          const string = new TextDecoder("utf-16").decode(bytes);
          return string
      },
      /** @type {(string: String, offset: number) => void} */
      store: (string, offset) => {
          const view = new DataView(globalThis["peter-jerry-ye:canvas"].memory.buffer, offset);
          for (let i = 0; i < string.length; i++) {
              view.setUint16(i * 2, string.charCodeAt(i), true);
          }
      },
      /** @type {() => String} */
      empty: () => "",
      log: console.log
  },
  "peter-jerry-ye:canvas/Array": {
      length: (array) => array.length,
      /** @type {(offset: number, length: number) => Float64Array} */
      load_float64_array: (offset, length) => {
          return new Float64Array(globalThis["peter-jerry-ye:canvas"].memory.buffer, offset, length);
      },
      /** @type {<T extends number>(array: Array<T>, offset: number) => void} */
      store_float64_array: (array, offset) => {
          const view = new DataView(globalThis["peter-jerry-ye:canvas"].memory.buffer, offset);
          for (let i = 0; i < array.length; i++) {
              view.setFloat64(i * 8, array[i], true);
          }
      },
      empty: () => []
  },
  "peter-jerry-ye:canvas/window": {
      /** @type {(callback: FrameRequestCallback) => number} */
      requestAnimationFrame: (callback) => window.requestAnimationFrame(callback),
      /** @type {(id: number) => void} */
      cancelAnimationFrame: (id) => window.cancelAnimationFrame(id)
  },
  "peter-jerry-ye:canvas/event": {
      /** @type {(callback: (_: KeyboardEvent) => void) => void} */
      set_onkeydown: (callback) => { (globalThis["peter-jerry-ye:canvas"].eventTarget ?? globalThis).onkeydown = callback },
      /** @type {(callback: (_: KeyboardEvent) => void) => void} */
      set_onkeyup: (callback) => { (globalThis["peter-jerry-ye:canvas"].eventTarget ?? globalThis).onkeyup = callback },
      /** @type {(callback: (_: MouseEvent) => void) => void} */
      set_onwheel: (callback) => { (globalThis["peter-jerry-ye:canvas"].eventTarget ?? globalThis).onwheel = callback },
      /** @type {(callback: (_: MouseEvent) => void) => void} */
      set_onmousemove: (callback) => { (globalThis["peter-jerry-ye:canvas"].eventTarget ?? globalThis).onmousemove = callback },
      /** @type {(callback: (_: MouseEvent) => void) => void} */
      set_onmouseenter: (callback) => { (globalThis["peter-jerry-ye:canvas"].eventTarget ?? globalThis).onmouseenter = callback },
  },
  "peter-jerry-ye:canvas/KeyboardEvent": {
      /** @type {(event: KeyboardEvent) => String} */
      key: (event) => event.key,
      /** @type {(event: KeyboardEvent) => String} */
      code: (event) => event.code,
      /** @type {(event: KeyboardEvent) => Boolean} */
      isComposing: (event) => event.isComposing,
      /** @type {(event: KeyboardEvent) => void} */
      preventDefault: (event) => event.preventDefault(),
  },
  "peter-jerry-ye:canvas/MouseEvent": {
      /** @type {(event: MouseEvent) => void} */
      preventDefault: (event) => event.preventDefault(),
      /** @type {(event: MouseEvent) => number} */
      buttons: (event) => event.buttons,
      /** @type {(event: MouseEvent) => boolean} */
      altKey: (event) => event.altKey,
      /** @type {(event: MouseEvent) => boolean} */
      ctrlKey: (event) => event.ctrlKey,
      /** @type {(event: MouseEvent) => boolean} */
      shiftKey: (event) => event.shiftKey,
      /** @type {(event: MouseEvent) => number} */
      offsetX: (event) => event.offsetX,
      /** @type {(event: MouseEvent) => number} */
      offsetY: (event) => event.offsetY,
  },
  "peter-jerry-ye:canvas/WheelEvent": {
      /** @type {(event: WheelEvent) => number} */
      deltaX: (event) => event.deltaX,
      /** @type {(event: WheelEvent) => number} */
      deltaY: (event) => event.deltaY,
      /** @type {(event: WheelEvent) => number} */
      deltaZ: (event) => event.deltaZ,
      /** @type {(event: WheelEvent) => number} */
      deltaMode: (event) => event.deltaMode,
      /** @type {(event: WheelEvent) => void} */
      preventDefault: (event) => event.preventDefault(),
  },
  spectest: {
      print_char: log
  },
  "moonbit:ffi": {
      make_closure: (funcref, closure) => funcref.bind(null, closure)
  },
  "mandel" : {
        "set_value": (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        }
    }
};
