var ProductController = require('../controllers/productController');

const productRoutes = (app) => {
    app.route('/product')
       .post((req, res) => {
            var pc = new ProductController(app);
            pc.addProduct(req.body).then((product) => {
                res.json(product);
            });
        })
       .get((req, res) => {
            var pc = new ProductController(app);
            pc.getAllProducts().then(products => {                
                res.json(products);
            }).catch(err => {
                res.json(err);
            });
        }); 
    
    app.route('/product/:productId')
       .get((req, res) => {
            var pc = new ProductController(app);
            pc.getProductById(req.params.productId).then(product => {
                res.json(product);
            }).catch(err => {
                res.json(err);
            });
       }); 
}

module.exports = productRoutes;
