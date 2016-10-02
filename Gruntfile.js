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

	// Project configuration. 
	// grunt.initConfig({
	// 	pkg: grunt.file.readJSON('package.json'),
	// 	concat: {
	// 		options: {
	// 			stripBanners: true,
	// 			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
	// 			'<%= grunt.template.today("yyyy-mm-dd") %> */',
	// 		},
	// 		dist: {
	// 			src: ['src/project.js'],
	// 			dest: 'dist/built.js',
	// 		},
	// 	},
	// });

	grunt.registerTask('default', ['uglify']);
};
