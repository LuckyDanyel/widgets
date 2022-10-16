const path = require('path');
const svelteConfig = require(path.resolve(__dirname, 'config/svelteConfig'));
const vueConfig = require(path.resolve(__dirname, 'config/vueConfig'));

module.exports = (env) => [
    {
        name: 'svelteConfig',
        ...svelteConfig(env, __dirname),
    },
    {
        name: 'vueConfig',
        ...vueConfig(env, __dirname),
    }
]
module.exports.parallelism = 1;