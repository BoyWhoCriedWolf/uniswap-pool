/// <reference types="node" />
/// <reference types="react" />
import { Buffer } from 'buffer';

declare global {
    interface Window {
        Buffer: typeof Buffer;
    }
}

declare function UniswapWidget(): JSX.Element;

export { UniswapWidget as default };
