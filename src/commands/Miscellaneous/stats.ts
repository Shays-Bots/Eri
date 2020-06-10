import { CustomCommand } from '../../classes/command';
import { Message, MessageEmbed } from 'discord.js';

export default class extends CustomCommand {
	public constructor() {
		super({
			clientPermissions: ['EMBED_LINKS'],
		});
	}

	public async exec(message: Message): Promise<Message | Message[]> {
		const embed = new MessageEmbed()
			.setTitle('Statistics')
			.setColor(6345206)
			.addField(...this.uptime)
			.addField(...this.memory)
			.addField(...this.cachedUsers)
			.addField(...this.totalUsers);

		return message.util!.send(embed);
	}

	private get uptime(): [string, string, boolean] {
		const uptime = process.uptime();
		const output = new Date(uptime * 1000).toISOString().slice(11, -1);

		return ['Uptime', output, true];
	}

	private get memory(): [string, string, boolean] {
		const { heapUsed } = process.memoryUsage();
		const output = `${Math.round(heapUsed / (1024 * 1024))} MiB`;

		return ['Memory', output, true];
	}

	private get cachedUsers(): [string, string, boolean] {
		const guilds = this.client.users.cache.size;

		return ['Cached Users', guilds.toString(), true];
	}

	private get totalUsers(): [string, string, boolean] {
		const guilds = this.client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b);

		return ['Total Users', guilds.toString(), true];
	}
}
