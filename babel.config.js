/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

// This is not https://babeljs.io/docs/en/configuration config. 
// This is custom file, which simply exports babel presets and plugins.
// This file is later used by Webpack `babel-loader` directly.
// This is a workaround for a babel issue https://github.com/babel/babel/issues/8309.

const presets = [
    '@babel/preset-env',
    '@babel/preset-react'
];

const plugins = [
    'transform-rebem-jsx',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    [
        'module-resolver', {
            root: './',
            alias: {
                Style: './app/style/',
                Component: './app/component/',
                Route: './app/route/',
                Store: './app/store/',
                Util: './app/util/',
                Query: './app/query/',
                Type: './app/type/'
            }
        }
    ],
    [
        'console-source', {
            segments: 1
        }
    ]
];

module.exports = {
    presets,
    plugins
};
