const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password){
		return res.status(400).json('incorrect form submission')
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trans => {
		trans.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trans('users')
				.returning('*')
			 	.insert({
					email: loginEmail[0],
					name: name,
					joined: new Date()
				}).then(user =>{
					res.json(user[0]);
				})
		})
		.then(trans.commit)
		.catch(trans.rollback)
	})
	.catch( err => res.status(404).json('Email Address Already Exist. Try a different one!'))
}

export default handleRegister;