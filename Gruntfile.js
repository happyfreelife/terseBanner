module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			options: {
				banner: '/* <%= pkg.name %> v<%= pkg.version %> | <%= pkg.uri %>*/\n'
			},

			'dist/jquery.<%= pkg.name %>.min.js': 'src/jquery.<%= pkg.name %>.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify']);
};
