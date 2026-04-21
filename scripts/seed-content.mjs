import { execSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const contentDir = 'content';
const args = process.argv.slice(2);
const skipConfirm = args.includes('--yes') || args.includes('-y');
const slugFilter = args.find((a) => !a.startsWith('-'));
const escape = (s) => `'${s.replace(/'/g, "''")}'`;
const statements = [];

if (slugFilter && !existsSync(join(contentDir, slugFilter))) {
	console.error(`Slug "${slugFilter}" not found under ${contentDir}/`);
	process.exit(1);
}

const slugs = slugFilter ? [slugFilter] : readdirSync(contentDir);

for (const slug of slugs) {
	for (const file of readdirSync(join(contentDir, slug))) {
		if (!file.endsWith('.md')) continue;
		const locale = file.replace(/\.md$/, '');
		const body = readFileSync(join(contentDir, slug, file), 'utf-8');
		statements.push(
			`INSERT INTO content_block (slug, locale, body, updated_at) VALUES (${escape(slug)}, ${escape(locale)}, ${escape(body)}, unixepoch() * 1000) ON CONFLICT(slug, locale) DO UPDATE SET body = excluded.body, updated_at = excluded.updated_at;`
		);
	}
}

const scope = slugFilter ? `slug "${slugFilter}"` : `ALL ${slugs.length} slugs`;
console.log(
	`About to upsert ${statements.length} content block(s) for ${scope} into D1 (remote).`
);
console.log('This will overwrite any edits made through the admin CMS for these slugs.');

if (!skipConfirm) {
	if (!stdin.isTTY) {
		console.error('No TTY available. Re-run with --yes to skip confirmation.');
		process.exit(1);
	}
	const rl = createInterface({ input: stdin, output: stdout });
	const answer = (await rl.question('Proceed? (y/N) ')).trim().toLowerCase();
	rl.close();
	if (answer !== 'y' && answer !== 'yes') {
		console.log('Aborted.');
		process.exit(0);
	}
}

const sql = statements.join('\n') + '\n';
const dir = mkdtempSync(join(tmpdir(), 'seed-content-'));
const sqlFile = join(dir, 'seed.sql');
writeFileSync(sqlFile, sql);

console.log(`Seeding…`);
execSync(`npx wrangler d1 execute DB --remote --file="${sqlFile}"`, { stdio: 'inherit' });
