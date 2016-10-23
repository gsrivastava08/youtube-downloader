/**
 * VideofetchController
 *
 * @description :: Server-side logic for managing videofetches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var ytdl = require('ytdl-core');
module.exports = {
	'getInfo': function(req, res){
		var url = req.param('url');
		ytdl.getInfo(url, function(err, info){
			if(err){
				res.json(503,{error: 'Server is not available.'});
			}else{
				var filtered_list = info.formats.filter(function(item){return (item.audioBitrate != null && item.bitrate != null);})
				res.json(200,{data: {description: info.description, list: filtered_list}});
			}
	});
	}
};
