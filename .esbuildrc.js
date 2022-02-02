const { resolve } = require('path')
const sane = require('sane')
const esbuild = require('esbuild')

const watching = process.argv.includes('--watch')

const build = async () => {
  const startedAt = Date.now()
  const entry = resolve(__dirname, './src/index.ts')
  const outfile = resolve(__dirname, `./dist/index.js`)
  console.log(`Bundling ${entry}`)
  try {
    await esbuild.build({
      entryPoints: [entry],
      outfile,
      minify: true,
      bundle: true,
      define: { 'process.env.NODE_ENV': '"production"' },
      sourcemap: watching
    })
  } catch (error) {
    console.error(error)
    if (!watching) {
      process.exit(1)
    }
  }
  console.log(`Bundled ${outfile} in ${Date.now() - startedAt} [ms]`)
}

build().then(() => {
  if (watching) {
    console.log('Watching...')
    sane('./src', { glob: ['**/*.ts', '**/*.jsx'] }).on('change', build)
  }
})
