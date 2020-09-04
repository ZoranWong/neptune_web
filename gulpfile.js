const gulp = require('gulp');
const gulpif = require('gulp-if');
const minimist = require('minimist');
const fs = require('fs-extra')

let knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'production' }
};

let options = minimist(process.argv.slice(2), knownOptions);

function devConfig() {
    try {
        fs.copySync('./src/config/app.dev.js', './src/config/app.js')
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}

function prodConfig() {
    try {
        fs.copySync('./src/config/app.prod.js', './src/config/app.js')
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}

function stagingConfig() {
    try {
        fs.copySync('./src/config/app.staging.js', './src/config/app.js')
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}

function defaultTask(cb) {
    switch (options['env']) {
        case 'dev':
            devConfig();
            break;
        case 'staging':
            stagingConfig();
            break;
        case 'prod':
            prodConfig();
            break;
    }
    cb();
}

exports.default = defaultTask