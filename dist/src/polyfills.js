import 'polyfill-object.fromentries';
import { ResizeObserver } from '@juggle/resize-observer';
import flat from 'array.prototype.flat';
import flatMap from 'array.prototype.flatmap';
import { Buffer } from '../node_modules/rollup-plugin-node-polyfills/polyfills/buffer-es6.js';

flat.shim();
flatMap.shim();
if (!window.Buffer) {
  window.Buffer = Buffer;
}
if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver;
}
