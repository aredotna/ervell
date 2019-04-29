// @ts-check

const fs = require('fs')
const dotenv = require('dotenv')

const getEnv = () => {
  switch (true) {
    case fs.existsSync('.env'):
      return '.env'
    case fs.existsSync('.env.staging'):
      return '.env.staging'
    case fs.existsSync('.env.production'):
      return '.env.production'
  }
}

dotenv.config({
  path: getEnv(),
})
