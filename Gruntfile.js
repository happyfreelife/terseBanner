module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				options: {
					// separator: '\n',
					banner: '/**\n' +
						' * <%= pkg.name %>\n' +
						' * Version: <%= pkg.version %>\n' +
						' * URI: <%= pkg.uri %>\n' +
						' * Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' **/\n'
				},
				src: [
					'src/wrap-begin.js',
					'src/global.js',
					'src/banner.js',
					'src/init.js',
					'src/default-style.js',
					'src/set-style.js',
					'src/add-element.js',
					'src/bind-animation.js',
					'src/bind-event.js',
					'src/lazyload.js',
					'src/main.js',
					'src/wrap-end.js'
				],
				dest: 'dist/jquery.<%= pkg.name %>.pkgd.js',
			}
		},

		uglify: {
			options: {
				banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.uri %>' +
						' - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			my_target: {
				files: {
					'dist/jquery.<%= pkg.name %>.min.js': ['dist/jquery.<%= pkg.name %>.pkgd.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['concat', 'uglify']);
};
