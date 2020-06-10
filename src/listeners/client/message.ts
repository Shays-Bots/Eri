import { CustomListener } from '../../classes/listener';
import { Message } from 'discord.js';
import { updateLeaderboard } from '../../classes/utilities';

export default class extends CustomListener {
	public async exec(message: Message): Promise<void> {
		if (!message.guild) return;
		if (!message.member) return;

		const entity = await message.guild.getEntity();
		if (!entity.inputChannel || message.channel.id !== entity.inputChannel) return;
		if (!entity.leaderboardChannel) return;

		const containsLink = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/ig.test(message.content);
		if (containsLink) {
			if (entity.scores[message.member.id]) entity.scores[message.member.id]++;
			else entity.scores[message.member.id] = 1;
			await message.guild.updateEntity(entity);
			await message.react('👍');
			await updateLeaderboard(message.guild);
		}
	}
}
