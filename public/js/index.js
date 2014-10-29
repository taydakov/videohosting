'use strict'

angular.module('videoApp', ['angularFileUpload'])
	.controller('VideoListController', ['$scope', '$upload', function($scope, $upload) {
	    $scope.uploading = {};
	    $scope.uploading.isactive = false;
    	$scope.uploading.percentage = 0;

    	var files = null;

		$scope.uploadSubmit = function(form) {
			if (!files) return;
			var file = files[0];

			$scope.uploading.isactive = true;
			$scope.uploading.percentage = 0;
			$scope.upload = $upload.upload({
				url: 'upload',
				file: file,
			}).progress(function(evt) {
				$scope.uploading.percentage = parseInt(100.0 * evt.loaded / evt.total);
			}).success(function(data, status, headers, config) {
				// file is uploaded successfully
				location.reload();
			})
			//.error(...)
			.then(function(success, error, progress) {
				$scope.uploading.isactive = false;
			});
		};

		$scope.onFileSelect = function(selectedFiles) {
			files = selectedFiles;
		}
	}]);