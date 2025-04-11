import { build } from 'esbuild';

async function runBuild() {
  await build({});
}

runBuild().catch(() => process.exit(1));
