const username = "postgres"
const password = "playstation117"
const ip = "localhost"
const port = 5432
const dataBaseName = "test"

const Sequelize = require('sequelize');

const path = "postgres://" + username + ":" + password + "@" + ip + ":" + port + "/" + dataBaseName;
//const path = "postgres://postgres:playstation117@localhost:5432/test";
const sequelize = new Sequelize(path);

sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

let bookLst = sequelize.define('book_lists', {
	ID: { type: Sequelize.INTEGER, allowNull: false },
	Name: Sequelize.STRING(120),
	Author: Sequelize.STRING(120),
	Type: Sequelize.STRING(120),
	Publish_date: Sequelize.DATEONLY,
	Available: Sequelize.BOOLEAN,
	Quantity: Sequelize.INTEGER
}, {timestamps: false});

async function ModifyBook(actualName, newName, author, type, available, quantity)
{
	let id = await bookLst.update(
		{
			Name: newName,
			Author: author,
			Type: type,
			//Publish_Date: publishdate,
			Available: available,
			Quantity: quantity
		},

		{ where: { Name: actualName } }).then(() => console.log("changing done."));
	sequelize.close();
}

ModifyBook("book 2", "SDA", "moi", "livre", true, 5);
