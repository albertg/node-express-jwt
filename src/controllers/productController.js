class ProductController{
    constructor(app){
        this.db = app.get('db');  
        this.models = this.db.models;      
    }

    addProduct(newProduct){
        return new Promise((resolve, reject) => {
            var product = this.models.Product.create({
                name: newProduct.name,
                description: newProduct.description
            });
            resolve(product); 
        });
    }

    getAllProducts(){
        return new Promise((resolve, reject) => {
            this.models.Product.findAll({attributes: ['id','name','description']}).then(products => {
                if(products){
                    resolve(products);
                }else{
                    reject({success: false, message: "No products found"});
                }
            });
        });
    }

    getProductById(productId){
        return new Promise((resolve, reject) => {
            this.models.Product.findById(productId, {attributes: ['id','name','description']}).then(product => {
                if(product){
                    resolve(product);
                }else{
                    reject({success: false, message: "No products found"});
                }
            });
        });
    }
}

module.exports = ProductController;
