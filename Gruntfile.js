/*global module:false*/

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            dist: 'dist',
            libs: 'libs',
            webroot: 'dist'
        },
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= pkg.homepage ? " * " + pkg.homepage + "\\n " : "" %>' +
                '* Copyright (c) <%= grunt.template.today(" yyyy ") %> <%= pkg.author.name %>;' +
                ' Licensed <%= pkg.license.type %> */'
        },
        connect: {
            server: {
                options: {
                    port: 9001, // The port on which the webserver will respond.
                    hostname: '*', // Default 'localhost'. Setting this to '*' will make the server accessible from anywhere. Useful for cross-device testing.
                    base: '<%= config.webroot %>', // The base (or root) directory from which files will be served. Defaults to the project Gruntfile's directory.
                    middleware: function(connect, options) {
                        var middlewares = [];
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }
                        var directory = options.directory || options.base[options.base.length - 1];
                        options.base.forEach(function(base) {
                            // Serve static files.
                            middlewares.push(connect.static(base));
                        });
                        // Make directory browse-able.
                        middlewares.push(connect.directory(directory));
                        return middlewares;
                    }
                }
            }
        },
        concat: {
            options: {
                separator: ';',
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: ['src/jquery.ioslist.src.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            files: 'src/jquery.ioslist.src.js',
            tasks: ['jshint', 'concat', 'uglify'],
            options: {
                livereload: true
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                curly: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    $: true,
                    swfobject: true,
                    console: true
                }
            },
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        copy: {
            default: {
                files: [{
                    expand: true,
                    flatten: true,
                    dest: '<%= config.dist %>/js/',
                    src: ['bower_components/jquery/jquery.min.js']
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', [
        'jshint',
        'concat',
        'uglify',
        'copy:default'
    ]);

    grunt.registerTask('server', [
        'default',
        'connect',
        'watch'
    ]);

};