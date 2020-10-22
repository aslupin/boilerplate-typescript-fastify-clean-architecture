import configYaml from 'config-yaml'

const config = configYaml(`${__dirname}/../../config/config.yml`)

export default config[process.env.NODE_ENV as string]
