
exports.IsAuthenticated = function(req, res, next) {
	console.log("Am I Authorized?: " + req.isAuthenticated());
	if (req.isAuthenticated()) {
		next();
	} else {
		next(new Error(401));
	}
}

exports.destroySession = function(req, res, next) {
	req.logOut();
	req.session.destroy();
	req.redirect("/login");
}