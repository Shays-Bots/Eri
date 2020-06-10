import { CustomListener } from '../../classes/listener';
import { getResetDate, updateLeaderboard } from '../../classes/utilities';

export default class extends CustomListener {
	public async exec(): Promise<void> {
		console.log(this.client.user!.tag);

		this.client.guilds.cache.forEach(async guild => {
			const entity = await guild.getEntity();
			const date = getResetDate(entity.resetDay, entity.resetDate);

			const reset = async () => {
				date.setDate(new Date().getDate() + 7);
				date.setUTCHours(0, 0, 0, 0);
				entity.resetDate = date;
				entity.scores = {};
				await guild.updateEntity(entity);
				await updateLeaderboard(guild);
				setTimeout(reset, date.getTime() - new Date().getTime());
			};
			setTimeout(reset, date.getTime() - new Date().getTime());
		});
	}
}
