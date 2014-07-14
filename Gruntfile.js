module.exports = function(grunt) {

    grunt.initConfig({
        fileserver: {
            ta: {
                options: {
                    port: 8080,
                    hostname: 'localhost',
                    cwd: '.',
                    root: '',
                    dirAlias: {},
                    keepalive: true,
                    onStart: function(){ console.log('server started'); },
                    onStop: function(){ console.log('server stopped'); }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-fileserver');

    // Default task(s).
    grunt.registerTask('default', ['fileserver']);

};