import { CustomCommand } from '../../classes/command';
import { Message, MessageEmbed } from 'discord.js';

export default class extends CustomCommand {
	public constructor() {
		super({
			clientPermissions: ['EMBED_LINKS'],
		});
	}

	public async exec(message: Message): Promise<Message | Message[]> {
		const { username } = this.client.user!;

		const fields = this.handler.modules
			.filter(m => m.description)
			.filter(m => message.guild ? true : m.channel !== 'guild')
			.map(command => ({
				name: `${command.id} ${command.description.args || ''}`,
				value: command.description.help || '',
			}));

		const embed = new MessageEmbed()
			.setTitle(`${username} Commands`)
			.setDescription(`[Source Code](https://github.com/Shays-Bots/${username}) | [Support Server](https://discord.shaybox.com)`)
			.addFields(fields)
			.setColor(6345206);

		return message.util!.send(embed);
	}
}
