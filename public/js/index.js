'use strict'

angular.module('videoApp', ['angularFileUpload'])
	.controller('VideoListController', ['$scope', '$upload', function($scope, $upload) {
		/* title and video file */
		var files = null;
		$scope.videotitle = "";

		$scope.videosearch = "";

		/* progress bar */
		$scope.uploading = {};
		$scope.uploading.isactive = false;
		$scope.uploading.percentage = 0;

		/* error */
		$scope.error = {};
		$scope.error.message = "";

		// TODO: remove DOM manipulations from the controller
		/* search request has been changed */
		$scope.$watch('videosearch', function() {
			var visibleElementsNumber = 0;

			$('.videoitem').each(function(index) {
				var title = $(this).find('.videotitle').html();
				var date = $(this).find('.videodate').html();
				var text = title + ' ' + date;
				if (text.toLowerCase().indexOf($scope.videosearch.toLowerCase()) !== -1) {
					visibleElementsNumber += 1;
					$(this).show();
				} else {
					$(this).hide();
				}
			});

			if (visibleElementsNumber === 0) {
				$('#novideos').show();
			} else {
				$('#novideos').hide();
			}
		});

		$scope.uploadSubmit = function(form) {
			if (!files) return;
			var file = files[0];

			$scope.uploading.isactive = true;
			$scope.uploading.percentage = 0;
			$scope.upload = $upload.upload({
				url: 'upload',
				data: {
					videotitle: $scope.videotitle
				},
				file: file,
			}).progress(function(evt) {
				$scope.uploading.percentage = parseInt(100.0 * evt.loaded / evt.total);
			}).success(function(data, status, headers, config) {
				// file is uploaded successfully
				location.reload();
			})
			.error(function() {
				$scope.uploading.isactive = false;
				$scope.error.message = "Uploading is failed";
			})
			.then(function(success, error, progress) {
				$scope.uploading.isactive = false;
			});
		};

		$scope.onFileSelect = function(selectedFiles) {
			files = selectedFiles;

			$scope.error.message = "";
			if (files[0].size > 10 * 1024 * 1024) // 10MiB is the max file size
				$scope.error.message = "The file is too big to be uploaded";
		}
	}]);