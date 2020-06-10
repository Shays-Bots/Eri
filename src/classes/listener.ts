import { basename, parse, ParsedPath } from 'path';
import { Listener, ListenerOptions } from 'discord-akairo';

function getPath(module: NodeModule): ParsedPath {
	delete require.cache[module.filename];

	return parse(module.parent!.filename);
}

export class CustomListener extends Listener {
	public constructor(options?: ListenerOptions) {
		const path = getPath(module);
		const filename = path.name;
		const foldername = basename(path.dir);
		super(filename, { event: filename, emitter: foldername, ...options });
	}
}
