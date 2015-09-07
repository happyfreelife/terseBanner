module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			options: {
				banner: '/* jquery.<%= pkg.name %>.min.js    @version: <%= pkg.version %> */\n'
			},

			'dist/jquery.<%= pkg.name %>.min.js': 'src/*.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify']);
};
