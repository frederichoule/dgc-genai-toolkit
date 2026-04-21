import { clearAll } from '$lib/server/cache';
import type { Actions } from './$types';

export const actions: Actions = {
	clearCache: async ({ platform }) => {
		const cleared = await clearAll(platform!.env.CACHE);
		return { cleared };
	}
};
