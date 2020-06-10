import { Command } from 'discord-akairo';
import { CustomListener } from '../../classes/listener';
import { Message } from 'discord.js';

export default class extends CustomListener {
	public async exec(message: Message, command: Command, type: string, missing: any): Promise<void> {
		await message.util!.send(`${type === 'client' ? 'I am' : 'You are'} missing permissions ${missing}`, { embed: undefined });
	}
}
