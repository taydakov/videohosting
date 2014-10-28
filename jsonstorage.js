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
	this.data = JSON.parse(fs.readFileSync(this.filepath).toString());
}

/* Save data to storage file */
JSONStorage.prototype.saveData = function() {
	fs.writeFileSync(this.filepath, JSON.stringify(this.data, undefined, 2));
}

module.exports = JSONStorage;