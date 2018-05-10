var Users = require('./Users');


exports.create = function (req, res) {
	var user = new Users(req.body);
	user.save(function (err, user) {
	    if (err) {
	    	return console.error(err);	
	    } 
	    res.redirect('/login');
	});
};

exports.login = function (req, res) {
	Users.findOne({username : req.body.username}).exec(function (err, user) {
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

exports.logout = function (req, res) {
	req.session.destroy(function(err) {
		if (err) {
			return console.log(err);
		}
		res.json("logged out")
	})
};

exports.findUser = function (req, res) {
	Users.findOne({username : req.session.username}).exec(function (err, user) {
		res.json(user)
	});
};
