const Product = require('../models/productSchema');

module.exports.getHome = (req,res)=>{
    return res.render('index', { title: "Dashboard", page: "dashboard" });
}

module.exports.getProducts = async (req,res)=>{
    const products = await Product.find({});
    console.log(products);
    return res.render('./pages/product/list',{products});
}