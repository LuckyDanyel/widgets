const path = require('path');
const svelteConfig = require(path.resolve(__dirname, 'config/svelteConfig'));
const vueConfig = require(path.resolve(__dirname, 'config/vueConfig'));
const baseConfig = require(path.resolve(__dirname, 'config/baseConfig'));
const { merge } = require('webpack-merge');

module.exports = (env) => [
    {
        name: 'svelteConfig',
        ...merge(baseConfig(env, __dirname), svelteConfig(env, __dirname)),
    },
    {
        name: 'vueConfig',
        ...merge(baseConfig(env, __dirname), vueConfig(env, __dirname)),
    }
]
module.exports.parallelism = 1;