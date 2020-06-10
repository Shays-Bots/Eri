import { CustomCommand } from '../../classes/command';
import { Message, MessageEmbed } from 'discord.js';
import { multilineCodeblock } from 'discord.js-utilities';
import fetch from 'node-fetch';
import { inspect } from 'util';

export default class extends CustomCommand {
	public constructor() {
		super({
			args: [{
				id: 'code',
				match: 'content',
			}],
			clientPermissions: ['EMBED_LINKS'],
			ownerOnly: true,
		});
	}

	public async exec(message: Message, { code }: { code: string }): Promise<Message | Message[]> {
		if (!code) return message.util!.send('No code provided');

		let body;
		try {
			// eslint-disable-next-line no-eval
			body = await eval(code);
			if (!(body instanceof String)) body = inspect(body);
			body = body.replace(this.client.token!, '[REDACTED]');

			if (body.length > 1024) {
				const { key } = await fetch('https://hasteb.in/documents', { body, method: 'post' }).then(res => res.json());
				body = `[Paste](https://hasteb.in/${key})`;
			} else {
				body = multilineCodeblock(body);
			}
		} catch (error) {
			body = multilineCodeblock(error.message);
		}

		const embed = new MessageEmbed()
			.setTitle(`Eval`)
			.addField('Input 📥', multilineCodeblock(code))
			.addField('📤 Output', body)
			.setColor(6345206);

		return message.util!.send(embed);
	}
}
