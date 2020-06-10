import { CustomCommand } from '../../classes/command';
import { inlineCodeblock } from 'discord.js-utilities';
import { Message } from 'discord.js';

export default class extends CustomCommand {
	public constructor() {
		super({
			args: [{
				id: 'newLevel',
				type: 'number',
			}],
			channel: 'guild',
			description: {
				help: 'Get or set the minimum level',
				args: '(optional level)',
			},
			clientPermissions: ['ADMINISTRATOR'],
		});
	}

	public async exec(message: Message, { newLevel }: { newLevel?: number }): Promise<Message | Message[]> {
		const entity = await message.guild!.getEntity();

		let content;
		if (newLevel) {
			if (message.member!.hasPermission('ADMINISTRATOR') || message.member! === message.guild!.owner!) {
				entity.minLevel = newLevel;
				message.guild!.updateEntity(entity);
				content = `Updated minimum level to ${newLevel}`;
			} else {
				content = 'You do not have permission to change the minimum level';
			}
		} else {
			content = [
				`Current minimum level is ${inlineCodeblock(entity.minLevel.toString())}`,
				`Type ${inlineCodeblock(`${entity.prefix}level (new level)`)} to change the level`,
			];
		}

		return message.util!.send(content, { embed: undefined });
	}
}
