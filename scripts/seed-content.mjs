import { execSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const contentDir = 'content';
const escape = (s) => `'${s.replace(/'/g, "''")}'`;
const statements = [];

for (const slug of readdirSync(contentDir)) {
	for (const file of readdirSync(join(contentDir, slug))) {
		if (!file.endsWith('.md')) continue;
		const locale = file.replace(/\.md$/, '');
		const body = readFileSync(join(contentDir, slug, file), 'utf-8');
		statements.push(
			`INSERT INTO content_block (slug, locale, body, updated_at) VALUES (${escape(slug)}, ${escape(locale)}, ${escape(body)}, unixepoch() * 1000) ON CONFLICT(slug, locale) DO UPDATE SET body = excluded.body, updated_at = excluded.updated_at;`
		);
	}
}

const sql = statements.join('\n') + '\n';
const dir = mkdtempSync(join(tmpdir(), 'seed-content-'));
const sqlFile = join(dir, 'seed.sql');
writeFileSync(sqlFile, sql);

console.log(`Seeding ${statements.length} content block(s) to D1 (remote)…`);
execSync(`npx wrangler d1 execute DB --remote --file="${sqlFile}"`, { stdio: 'inherit' });
