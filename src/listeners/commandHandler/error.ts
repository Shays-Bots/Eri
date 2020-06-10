import { Command } from 'discord-akairo';
import { CustomListener } from '../../classes/listener';
import { inlineCodeblock } from 'discord.js-utilities';
import { Message, MessageEmbed } from 'discord.js';

export default class extends CustomListener {
	public async exec(error: Error, message: Message, command: Command): Promise<void> {
		console.error(error);

		if (command.id === 'eval') return;

		await message.channel.send(error.stack, { code: true });

		const { DISCORD_WEBHOOK_ID, DISCORD_WEBHOOK_TOKEN } = process.env;
		if (!DISCORD_WEBHOOK_ID || !DISCORD_WEBHOOK_TOKEN) return;

		const webhook = await this.client.fetchWebhook(DISCORD_WEBHOOK_ID, DISCORD_WEBHOOK_TOKEN);
		const embed = new MessageEmbed()
			.setTitle(`Command: ${command.id}`)
			.setDescription(`Message: ${inlineCodeblock(message.content)}`)
			.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'webp' }))
			.setColor(16711680);

		await webhook.send(error.stack, {
			code: true,
			embeds: [embed],
			username: this.client.user!.username,
			avatarURL: this.client.user!.displayAvatarURL({ format: 'webp' }),
		});
	}
}
