import {$} from 'bun';

await $`bunx tsc -d`;

const permissions = Bun.file('src/shared/sa-permissions.json');
await Bun.write('dist/shared/sa-permissions.json', permissions);

await $`bun run buildContainer`;
await $`bun run tarInstaller`;
