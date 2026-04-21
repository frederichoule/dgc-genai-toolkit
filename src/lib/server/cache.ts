type Entry<T> = { value: T; expiresAt: number };

const store = new Map<string, Entry<unknown>>();

export async function cached<T>(key: string, ttlMs: number, loader: () => Promise<T>): Promise<T> {
	const hit = store.get(key);
	if (hit && hit.expiresAt > Date.now()) {
		return hit.value as T;
	}
	const value = await loader();
	store.set(key, { value, expiresAt: Date.now() + ttlMs });
	return value;
}

export function invalidate(key: string): void {
	store.delete(key);
}

export function clearAll(): number {
	const size = store.size;
	store.clear();
	return size;
}
