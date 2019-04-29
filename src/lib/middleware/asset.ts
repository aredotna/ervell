import path from 'path'
import fs from 'fs'
import chalk from 'chalk'

const { CDN_URL, NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'

export default function assetMiddleware() {
  if (isProduction) {
    const manifestPath = path.resolve(process.cwd(), 'manifest.json')

    let manifest = {}
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, { encoding: 'utf8' }))
    } catch (error) {
      console.error(chalk.red('\n[Ervell] Error parsing manifest:'), error)
    }

    return (_req, res, next) => {
      res.locals.asset = filename => {
        let manifestFile = manifest[filename] || filename
        if (CDN_URL) {
          manifestFile = CDN_URL + manifestFile
        }
        return manifestFile
      }
      next()
    }

    // Development, return the file being requested and don't look for a manifest
  } else {
    return (_req, res, next) => {
      res.locals.asset = filename => filename
      next()
    }
  }
}
