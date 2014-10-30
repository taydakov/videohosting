/*
 * Stores data to .json file
 */

var fs = require('fs');

/* Constructor */
function JSONStorage(filepath) {
	this.filepath = filepath;

	this.loadData();
}

/* Add new data */
JSONStorage.prototype.push = function(newData) {
	this.data.push(newData);
}

/* Load data from storage file */
JSONStorage.prototype.loadData = function() {
	this.data = [];
	var self = this;
	fs.readFile(this.filepath, function(err, data) {
		if (err) return console.log(err);
		self.data = JSON.parse(data.toString());
	});
}

/* Save data to storage file */
JSONStorage.prototype.saveData = function() {
	fs.writeFile(this.filepath, JSON.stringify(this.data, undefined, 2), function(err) {
		console.log(err);
	});
}

module.exports = JSONStorage;