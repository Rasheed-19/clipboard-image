import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import test from 'ava';
import {
	readClipboardImages,
	writeClipboardImages,
	hasClipboardImages,
} from './index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture1 = path.join(__dirname, 'fixture1.jpg');
const fixture2 = path.join(__dirname, 'fixture2.png');

test.serial('writeClipboardImages sets images on clipboard', async t => {
	await writeClipboardImages([fixture1, fixture2]);
	t.pass();
});

test.serial('hasClipboardImages detects images on clipboard', async t => {
	await writeClipboardImages([fixture1, fixture2]);
	t.true(await hasClipboardImages());
});

test.serial('readClipboardImages returns PNG file paths', async t => {
	await writeClipboardImages([fixture1, fixture2]);

	const files = await readClipboardImages();
	t.true(Array.isArray(files));
	t.is(files.length, 2);

	for (const file of files) {
		const base = path.basename(file);
		t.true(base.startsWith('clipboard-image-'));
		t.true(base.endsWith('.png'));
		const buffer = await fs.readFile(file); // eslint-disable-line no-await-in-loop
		t.true(buffer.length > 0);
		t.true(buffer.toString('hex').startsWith('89504e47')); // PNG signature
	}
});
