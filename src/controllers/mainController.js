/* base de datos */
const db = require('../database/models')
const {Op} = require('sequelize')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
/* 		return res.render('index',{ //aca traía todo del json
			visited: products.filter(product => product.category === 'visited'),
			sale: products.filter(product => product.category === 'in-sale'),
			toThousand,
		}) */
		const visited = db.Product.findAll({ //ahora lo traigo todo de la base de datos
			where: {
				categoryId: 1
			}
		});
		const sale = db.Product.findAll({
			where : {
				categoryId: 2
			}
		});
		Promise.all([visited, sale])
			.then(([visited,sale]) =>{
				return res.render('index',{
					visited,
					sale,
					toThousand
				})
			}).catch(error => console.log(error))
	},
	search: (req, res) => {
		const keywords = req.query.keywords
		db.Product.findAll({
			where: {
				[Op.or] : [ //para que tambien busque por algo que esta en la descripcion
					{
						name : {
							[Op.substring] : keywords
						}
					},
					{
						description: {
							[Op.substring] : keywords
						}
					},
				]
			}
		})
			.then(results => {
				res.render('results',{
					results,
					toThousand,
					keywords
				})
			}).catch(error => console.log(error))
	},
};

module.exports = controller;
