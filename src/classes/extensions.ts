import { getRepository } from 'typeorm';
import { GuildEntity } from '../entity/guild';
import { Structures } from 'discord.js';

Structures.extend('Guild', Guild => class CustomGuild extends Guild {
	public async getEntity() {
		const repository = getRepository(GuildEntity);
		let entity = await repository.findOne(this.id);
		if (!entity) {
			entity = repository.create({ id: this.id });
			await repository.insert(entity);
		}

		return entity;
	}

	public async updateEntity(entity: GuildEntity) {
		const repository = getRepository(GuildEntity);
		await repository.save(entity);
	}
});
