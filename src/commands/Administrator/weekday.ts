import { CustomCommand } from '../../classes/command';
import { inlineCodeblock } from 'discord.js-utilities';
import { Message } from 'discord.js';

export default class extends CustomCommand {
	public constructor() {
		super({
			args: [{
				id: 'newDay',
				type: 'uppercase',
			}],
			channel: 'guild',
			description: {
				help: 'Get or set the reset day',
				args: '(optional day)',
			},
			clientPermissions: ['ADMINISTRATOR'],
		});
	}

	public async exec(message: Message, { newDay }: { newDay?: string }): Promise<Message | Message[]> {
		const entity = await message.guild!.getEntity();
		const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

		let content;
		if (newDay) {
			if (message.member!.hasPermission('ADMINISTRATOR') || message.member! === message.guild!.owner!) {
				if (!days.includes(newDay.toString())) return message.util!.send('Not a valid day, Sunday', { embed: undefined });

				entity.resetDay = days.indexOf(newDay);
				message.guild!.updateEntity(entity);
				content = `Updated reset day to ${newDay}`;
			} else {
				content = 'You do not have permission to change the reset day';
			}
		} else {
			content = [
				`Current reset day is ${inlineCodeblock(days[entity.resetDay])}`,
				`Type ${inlineCodeblock(`${entity.prefix}level (new level)`)} to change the day`,
			];
		}

		return message.util!.send(content, { embed: undefined });
	}
}
