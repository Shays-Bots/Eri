import { GuildEntity } from '../../src/entity/guild';

declare module 'discord.js' {
	interface Guild {
		getEntity(): Promise<GuildEntity>;
		updateEntity(entity: GuildEntity): Promise<void>;
	}
}
