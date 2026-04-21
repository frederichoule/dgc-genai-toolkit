import { clearAll } from '$lib/server/cache';
import type { Actions } from './$types';

export const actions: Actions = {
	clearCache: async () => {
		const cleared = clearAll();
		return { cleared };
	}
};
