import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Arpan Layek',
		email: 'arpan@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Tanmoy Layek',
		email: 'tanmoy@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
]

export default users
