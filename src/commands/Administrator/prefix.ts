import { CustomCommand } from '../../classes/command';
import { inlineCodeblock } from 'discord.js-utilities';
import { Message } from 'discord.js';

export default class extends CustomCommand {
	public constructor() {
		super({
			args: [{
				id: 'newPrefix',
			}],
			channel: 'guild',
			description: {
				help: 'Get or set the guild prefix',
				args: '(optional prefix)',
			},
			clientPermissions: ['ADMINISTRATOR'],
		});
	}

	public async exec(message: Message, { newPrefix }: { newPrefix?: string }): Promise<Message | Message[]> {
		const entity = await message.guild!.getEntity();

		let content;
		if (newPrefix) {
			if (message.member!.hasPermission('ADMINISTRATOR') || message.member! === message.guild!.owner!) {
				entity.prefix = newPrefix;
				message.guild!.updateEntity(entity);
				content = `Updated prefix to ${newPrefix}`;
			} else {
				content = 'You do not have permission to change the bot prefix';
			}
		} else {
			content = [
				`Current prefix is ${inlineCodeblock(entity.prefix)}`,
				`Type ${inlineCodeblock(`${entity.prefix}prefix (new prefix)`)} to change the prefix`,
			];
		}

		return message.util!.send(content, { embed: undefined });
	}
}
