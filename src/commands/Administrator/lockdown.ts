import { CustomCommand } from '../../classes/command';
import { Message } from 'discord.js';

export default class extends CustomCommand {
	public constructor() {
		super({
			channel: 'guild',
			description: {
				help: 'Lock or Unlock guild',
			},
			userPermissions: ['MANAGE_ROLES'],
			clientPermissions: ['MANAGE_ROLES'],
		});
	}

	public async exec(message: Message): Promise<Message | Message[]> {
		if (!message.member || !message.guild!.me) return message.channel.send('The member object is uncached for some reason, try going online', { embed: undefined });

		const everyoneRole = message.guild!.roles.everyone;
		if (everyoneRole.permissions.has('SEND_MESSAGES')) {
			const newPermissions = everyoneRole.permissions.remove('SEND_MESSAGES');
			await everyoneRole.setPermissions(newPermissions);

			return message.channel.send('Locking server', { embed: undefined });
		}

		const newPermissions = everyoneRole.permissions.add('SEND_MESSAGES');
		await everyoneRole.setPermissions(newPermissions);

		return message.channel.send('Unlocking server', { embed: undefined });
	}
}
