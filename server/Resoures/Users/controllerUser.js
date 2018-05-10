var Users = require('./user');

// this function to create new User
exports.create = function (req, res) {
	var user = new Users(req.body);
	user.save(function (err, user) {
	    if (err) {
	    	return console.error(err);	
	    } 
	    res.redirect('/login');
	});
};
// this function to make login 
exports.login = function (req, res) {
	user.findOne({username : req.body.username}).exec(function (err, user) {
		if (err) {
			return console.error(err);
		}
		user.validatePassword(req.body.password, function(err, isMatch) {
        	if (err) { 
        		return res.json(err); 
        	}
        	if (!isMatch) {
        		res.json('Password not Match')
        	}
        	return req.session.regenerate(function(err) {
        		if (err) {
        			return console.error(err);
        		}
        		req.session.username = user.username;
        		res.json(user);
			})
			res.json(user)
	    });
	});
};
//
exports.findUser = function (req, res) {
	Users.findOne({username : req.session.username}).exec(function (err, user) {
		res.json(user)
	});
};
///
exports.test = function (req, res) {
	Users.findOne({username : req.session.username}).exec(function (err, user) {
		var id = user.items
		arr = [];
		for (var i = 0 ; i < id.length ; i++) {
			Items.findById(id[i]).exec(function (err, item) {
				console.log(item)
				arr.push(item)
			})
		}
		console.log(arr)
		res.json(arr)
	});
}
module.exports = Users;