const { build } = require('esbuild')
const { resolve } = require('path')
const args = process.argv.slice(2)

const watch = args.includes('--watch')
const production = args.includes('--production')

;(async () => {
  const start = new Date().getTime()

  console.log('Building...')

  try {
    await build({
      entryPoints: [resolve(__dirname, '../src/index.ts')],
      outfile: resolve(__dirname, '../dist/index.js'),
      minify: true,
      bundle: true,
      sourcemap: !production,
      target: 'es2020',
      platform: 'node',
      define: {},
      ...(watch && {
        watch: {
          onRebuild: (err) => {
            if (err) {
              console.error(err)
            } else {
              console.log(`Rebuilt in ${new Date().getTime() - start}ms`)
            }
          }
        }
      })
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Built in ${Date.now() - start}ms`)
})()
