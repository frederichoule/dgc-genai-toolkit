import { cachified, type Cache, type CacheEntry } from '@epic-web/cachified';

const DEFAULT_TTL = 1000 * 60 * 60 * 24; // 24h before forced refresh
const DEFAULT_SWR = 1000 * 60 * 5; // serve stale up to 5min while refreshing

function kvCache(kv: KVNamespace): Cache {
	return {
		name: 'cloudflare-kv',
		async get(key) {
			const raw = await kv.get(key);
			if (!raw) return null;
			try {
				return JSON.parse(raw) as CacheEntry;
			} catch {
				return null;
			}
		},
		async set(key, entry) {
			await kv.put(key, JSON.stringify(entry));
		},
		async delete(key) {
			await kv.delete(key);
		}
	};
}

export function cachify<T>(
	kv: KVNamespace,
	key: string,
	getFreshValue: () => Promise<T>,
	opts: { ttl?: number; swr?: number } = {}
): Promise<T> {
	return cachified<T>({
		cache: kvCache(kv),
		key,
		ttl: opts.ttl ?? DEFAULT_TTL,
		staleWhileRevalidate: opts.swr ?? DEFAULT_SWR,
		getFreshValue
	});
}

export async function invalidate(kv: KVNamespace, key: string): Promise<void> {
	await kv.delete(key);
}

export async function clearAll(kv: KVNamespace): Promise<number> {
	let cursor: string | undefined;
	let count = 0;
	do {
		const page = await kv.list({ cursor });
		await Promise.all(page.keys.map((k) => kv.delete(k.name)));
		count += page.keys.length;
		cursor = page.list_complete ? undefined : page.cursor;
	} while (cursor);
	return count;
}
