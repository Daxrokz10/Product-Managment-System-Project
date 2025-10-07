const Product = require('../models/productSchema');

module.exports.getHome = (req,res)=>{
    return res.render('index', { title: "Dashboard", page: "dashboard" });
}

module.exports.getProducts = async (req,res)=>{
    const products = await Product.find({});
    console.log(products);
    return res.render('./pages/product/list',{products});
}

module.exports.getUserPage = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.render('./pages/userPage', { products });
    } catch (error) {
        console.error(`Error fetching products: ${error.message}`);
        return res.status(500).send("Internal Server Error");
    }
};