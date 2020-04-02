module.exports = function (grunt) {
    grunt.initConfig({
        cssmin: {
            'dist/style.min.css': 'style.css',
            'dist/common.min.css': 'css/common.css'
        },
        uglify: {
            release: {
                files: {
                    'dist/banner.min.js': 'banner.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['cssmin', 'uglify:release']);
};