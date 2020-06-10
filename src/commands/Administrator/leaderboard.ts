import { CustomCommand } from '../../classes/command';
import { inlineCodeblock } from 'discord.js-utilities';
import { Message, TextChannel } from 'discord.js';

export default class extends CustomCommand {
	public constructor() {
		super({
			args: [{
				id: 'newChannel',
				type: 'channel',
			}],
			channel: 'guild',
			description: {
				help: 'Get or set the leaderboard channel',
				args: '(optional channel)',
			},
			clientPermissions: ['ADMINISTRATOR'],
		});
	}

	public async exec(message: Message, { newChannel }: { newChannel?: TextChannel }): Promise<Message | Message[]> {
		const entity = await message.guild!.getEntity();

		let content;
		if (newChannel) {
			if (message.member!.hasPermission('ADMINISTRATOR') || message.member! === message.guild!.owner!) {
				entity.leaderboardChannel = newChannel.id;
				message.guild!.updateEntity(entity);
				content = `Updated leaderboard channel to ${newChannel}`;
			} else {
				content = 'You do not have permission to change the leaderboard channel';
			}
		} else {
			const channel = message.guild!.channels.cache.get(entity.leaderboardChannel || '0');
			content = [
				`Current leaderboard channel is ${inlineCodeblock(!entity.inputChannel || !channel ? 'None' : channel.name)}`,
				`Type ${inlineCodeblock(`${entity.prefix}leaderboard (#Channel)`)} to change the channel`,
			];
		}

		return message.util!.send(content, { embed: undefined });
	}
}
