import { Guild, MessageEmbed, TextChannel } from 'discord.js';

export function getDaysUntilReset(day: number, date: Date) {
	return day + 7 - date.getUTCDay() - 1;
}

export function getResetDate(day: number, date: Date) {
	date.setHours(0, 0, 0, 0);
	date.setDate(date.getUTCDate() + 1 + (getDaysUntilReset(day, date) % 7));
	return date;
}

export async function updateLeaderboard(guild: Guild) {
	const entity = await guild.getEntity();
	if (!entity.leaderboardChannel) return;

	const channel = guild.channels.cache.get(entity.leaderboardChannel);
	if (!channel) return;
	if (!(channel instanceof TextChannel)) return;

	const fields = Object
		.entries(entity.scores)
		.sort((a, b) => a[1] - b[1])
		.map(([userID, score]) => {
			const user = guild.members.cache.get(userID);
			return {
				name: user ? user.displayName : userID,
				value: score.toString(),
				inline: true,
			};
		})
		.slice(0, 25);

	const embed = new MessageEmbed()
		.setTitle('Leaderboard')
		.setDescription(`${getDaysUntilReset(entity.resetDay, entity.resetDate)} days remaining`)
		.addFields(fields)
		.setColor(6345206);

	channel.messages.fetch(entity.leaderboardMessage || '0')
		.then(message => message.edit(embed))
		.catch(async () => {
			const message = await channel.send(embed);
			entity.leaderboardMessage = message.id;
			message.guild!.updateEntity(entity);
		});
}
