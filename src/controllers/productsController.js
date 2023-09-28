const { error } = require('console');
const db = require('../database/models')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		db.Product.findAll()
			.then(products => {
				res.render('products',{
					products,
					toThousand
				})
			}).catch(error => console.log(error))
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		db.Product.findByPk(req.params.id)
			.then(product =>{
				res.render('detail',{
					...product.dataValues,
					toThousand
				})
			}).catch(error => console.log(error))
	},

	// Create - Form to create
	create: (req, res) => {
		db.Category.findAll()
			.then(categories => {
				return res.render('product-create-form',{
					categories
				})
			}).catch(error => console.log(error))
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name, price, description, discount, categoryId} = req.body

		db.Product.create({
			name: name.trim(),
			price,
			description: description.trim(),
			discount: discount || 0,
			categoryId,
			image : req.file ? req.file.filename : null
		}).then(product =>{
			console.log(product);
			res.redirect('/products')
		}).catch(error => console.log(error))
	},

	// Update - Form to edit
	edit: (req, res) => {
		const categories = db.Category.findAll()
		const product = db.Product.findByPk(req.params.id)
		Promise.all([categories , product])
			.then(([categories, product]) =>{
				res.render('product-edit-form',{
					categories,
					...product.dataValues
				})
			}).catch(error => console.log(error))
	},
	// Update - Method to update
	update: (req, res) => {
		const {name, price, description, discount, categoryId} = req.body
		db.Product.update(
			{
				name: name.trim(),
				price,
				description: description.trim(),
				discount,
				categoryId,
				image: null
			},
			{
				where:{id:req.params.id}
			}
		).then(response =>{
			console.log(response);
			return res.redirect('/products/detail/' + req.params.id)
		}).catch(error => console.log(error))
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		db.Product.destroy({
			where:{id:req.params.id}
		}).then(response=>{
			console.log(response);
			return res.redirect('/products')
		}).catch(error => console.log(error))
	}
};

module.exports = controller;