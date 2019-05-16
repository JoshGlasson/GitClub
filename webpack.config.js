var path = require('path');

module.exports = {
    entry: {
        landingPage: './src/main/js/app.js',
        addFixturesPage: './src/main/js/addFixtures.js',
        calendarPage: './src/main/js/calendar.js'
    },
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/[name].js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};

