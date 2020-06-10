import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'guilds' })
export class GuildEntity {
	@PrimaryColumn()
	public id!: string;

	@Column({ 'default': 'e!' })
	public prefix!: string;

	@Column({ nullable: true })
	public inputChannel?: string;

	@Column({ nullable: true })
	public leaderboardChannel?: string;

	@Column({ nullable: true })
	public leaderboardMessage?: string;

	@Column({ 'type': 'json', 'default': {} })
	public scores!: { [userID: string]: number };

	@Column({ 'default': 3 })
	public minLevel!: number;

	@Column()
	public resetDate: Date = new Date();

	@Column({ 'default': 5 })
	public resetDay!: number;
}
