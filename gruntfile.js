module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      pug: {
        files: ['app/views/**'],
        tasks: ['livereload'],
        options: {
          nospawn: true,
          interrupt: false,
          debounceDelay: 250,
          // livereload: true
        }
      },
      js: {
        files: ['public/js/**', 'app/models/**/*.js', 'app/schemas/**/*.js'],
        // tasks: ['jshint'],
        tasks: ['livereload'],
        options: {
          nospawn: true,
          interrupt: false,
          debounceDelay: 250,
          // livereload: true
        }
      }
    },

    reload: {
      port: 35279,
      liveReload: {},
      proxy: {
        host: 'localhost',
        port: '3000'
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchFolders: ['./'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },

    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks("grunt-reload")
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-concurrent')

  grunt.option('force', true)
  grunt.registerTask('default', ['concurrent'])
  grunt.registerTask('livereload', ['reload', 'watch'])
}