'use strict';
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            'my_target': {
                files: {
                    './app/build/app.min.js': ['./app/app.js'],
                    './app/build/landingpage.min.js': ['./app/landingpage.js'],
                    './app/build/views/client/client.min.js': ['./app/views/client/client.js'],
                    './app/build/views/clients/clients.min.js': ['./app/views/clients/clients.js'],
                    './app/build/views/dashboard/dashboard.min.js': ['./app/views/dashboard/dashboard.js'],
                    './app/build/views/diet/diet.min.js': ['./app/views/diet/diet.js'],
                    './app/build/views/eating/eating.min.js': ['./app/views/eating/eating.js'],
                    './app/build/views/editDiet/editDiet.min.js': ['./app/views/editDiet/editDiet.js'],
                    './app/build/views/editRoutine/editRoutine.min.js': ['./app/views/editRoutine/editRoutine.js'],
                    './app/build/views/editTrainer/editTrainer.min.js': ['./app/views/editTrainer/editTrainer.js'],
                    './app/build/views/editUser/editUser.min.js': ['./app/views/editUser/editUser.js'],
                    './app/build/views/follows/follows.min.js': ['./app/views/follows/follows.js'],
                    './app/build/views/login/login.min.js': ['./app/views/login/login.js'],
                    './app/build/views/login/logout.min.js': ['./app/views/login/logout.js'],
                    './app/build/views/marks/marks.min.js': ['./app/views/marks/marks.js'],
                    './app/build/views/messages/messages.min.js': ['./app/views/messages/messages.js'],
                    './app/build/views/network/network.min.js': ['./app/views/network/network.js'],
                    './app/build/views/nodesMap/nodesMap.min.js': ['./app/views/nodesMap/nodesMap.js'],
                    './app/build/views/notifications/notifications.min.js': ['./app/views/notifications/notifications.js'],
                    './app/build/views/points/points.min.js': ['./app/views/points/points.js'],
                    './app/build/views/routine/routine.min.js': ['./app/views/routine/routine.js'],
                    './app/build/views/runs/runs.min.js': ['./app/views/runs/runs.js'],
                    './app/build/views/search/search.min.js': ['./app/views/search/search.js'],
                    './app/build/views/settings/settings.min.js': ['./app/views/settings/settings.js'],
                    './app/build/views/trainersSearcher/trainerSearcher.min.js': ['./app/views/trainersSearcher/trainersSearcher.js'],
                    './app/build/views/training/training.min.js': ['./app/views/training/training.js'],
                    './app/build/views/user/user.min.js': ['./app/views/user/user.js'],
                    './app/build/views/users/users.min.js': ['./app/views/users/users.js'],
                    './app/build/views/sidenav.min.js': ['./app/views/sidenav.js'],
                }
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    './app/build/index.html': ['./app/index.html'],
                    './app/build/landingpage.html': ['./app/landingpage.html'],
                    './app/build/views/client/client.html': ['./app/views/client/client.html'],
                    './app/build/views/clients/clients.html': ['./app/views/clients/clients.html'],
                    './app/build/views/dashboard/dashboard.html': ['./app/views/dashboard/dashboard.html'],
                    './app/build/views/diet/diet.html': ['./app/views/diet/diet.html'],
                    './app/build/views/eating/eating.html': ['./app/views/eating/eating.html'],
                    './app/build/views/editDiet/editDiet.html': ['./app/views/editDiet/editDiet.html'],
                    './app/build/views/editRoutine/editRoutine.html': ['./app/views/editRoutine/editRoutine.html'],
                    './app/build/views/editTrainer/editTrainer.html': ['./app/views/editTrainer/editTrainer.html'],
                    './app/build/views/editUser/editUser.html': ['./app/views/editUser/editUser.html'],
                    './app/build/views/follows/follows.html': ['./app/views/follows/follows.html'],
                    './app/build/views/login/login.html': ['./app/views/login/login.html'],
                    './app/build/views/login/logout.html': ['./app/views/login/logout.html'],
                    './app/build/views/marks/marks.html': ['./app/views/marks/marks.html'],
                    './app/build/views/marks/adddaytomark.tmpl.html': ['./app/views/marks/adddaytomark.tmpl.html'],
                    './app/build/views/marks/newmark.tmpl.html': ['./app/views/marks/newmark.tmpl.html'],
                    './app/build/views/messages/messages.html': ['./app/views/messages/messages.html'],
                    './app/build/views/network/network.html': ['./app/views/network/network.html'],
                    './app/build/views/nodesMap/nodesMap.html': ['./app/views/nodesMap/nodesMap.html'],
                    './app/build/views/notifications/notifications.html': ['./app/views/notifications/notifications.html'],
                    './app/build/views/points/points.html': ['./app/views/points/points.html'],
                    './app/build/views/routine/routine.html': ['./app/views/routine/routine.html'],
                    './app/build/views/runs/runs.html': ['./app/views/runs/runs.html'],
                    './app/build/views/search/search.html': ['./app/views/search/search.html'],
                    './app/build/views/settings/settings.html': ['./app/views/settings/settings.html'],
                    './app/build/views/trainersSearcher/trainerSearcher.html': ['./app/views/trainersSearcher/trainersSearcher.html'],
                    './app/build/views/training/training.html': ['./app/views/training/training.html'],
                    './app/build/views/user/user.html': ['./app/views/user/user.html'],
                    './app/build/views/user/imgComplete.tmpl.html': ['./app/views/user/imgComplete.tmpl.html'],
                    './app/build/views/users/users.html': ['./app/views/users/users.html'],
                    './app/build/views/sidenav.html': ['./app/views/sidenav.html'],
                    './app/build/views/imgComplete.tmpl.html': ['./app/views/imgComplete.tmpl.html'],
                    './app/build/views/newpost.tmpl.html': ['./app/views/newpost.tmpl.html'],
                }
            }
        },
        jshint: {
            options: {
                'node': true,
                'browser': true,
                'es5': true,
                'esnext': true,
                'bitwise': true,
                'camelcase': true,
                'curly': true,
                'eqeqeq': true,
                'immed': true,
                'indent': 2,
                'latedef': true,
                'newcap': true,
                'noarg': true,
                'quotmark': 'single',
                'regexp': true,
                'undef': true,
                'unused': true,
                'strict': true,
                'trailing': false,
                'smarttabs': true,
                'white': false,
                'globals': {
                    '$': false,
                    'angular': false,
                    'browser': false,
                    'repeater': false,
                    'element': false,
                    'inject': false,
                    'afterEach': false,
                    'beforeEach': false,
                    'confirm': false,
                    'context': false,
                    'describe': false,
                    'expect': false,
                    'it': false,
                    'jasmine': false,
                    'JSHINT': false,
                    'mostRecentAjaxRequest': false,
                    'qq': false,
                    'runs': false,
                    'spyOn': false,
                    'spyOnEvent': false,
                    'waitsFor': false,
                    'xdescribe': false
                },
            },
            all: ['Gruntfile.js', './app/app.js',]
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: './app',
                    src: ['ownstyle.css'],
                    dest: './app/build',
                    ext: '.min.css'
                }]
            }
        }
    })
    ;
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'jshint', 'cssmin', 'htmlmin']);
};