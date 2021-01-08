const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .ts('resources/ts/app.js', 'public/js');

// mix.browserSync({
//     proxy: {
//         target: "https://kudohayatoblog.com/",
//     },
//     https: true,
//     files: [
//         './resources/views/tools/program_generate/programGenerate.blade.php',
//     ],
// });