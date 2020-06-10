import { CustomListener } from '../../classes/listener';

export default class extends CustomListener {
	public async exec(info: string): Promise<void> {
		console.info(info);
	}
}
