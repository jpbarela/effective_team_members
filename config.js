module.exports = {
	port: process.env.PORT || 3000,
	db: process.env.MONGO_URI || 'mongodb://localhost/effective-team-member'
};