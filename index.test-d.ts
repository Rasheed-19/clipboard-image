import {expectType} from 'tsd';
import {hasClipboardImages, readClipboardImages, writeClipboardImages} from './index.js';

// HasClipboardImages returns boolean
expectType<Promise<boolean>>(hasClipboardImages());

// ReadClipboardImages returns string[]
expectType<Promise<string[]>>(readClipboardImages());

// WriteClipboardImages accepts readonly array of strings or URLs
expectType<Promise<void>>(writeClipboardImages(['a.png', 'b.jpg'] as const));
expectType<Promise<void>>(writeClipboardImages([new URL('file:///a.png'), new URL('file:///b.jpg')] as const));
