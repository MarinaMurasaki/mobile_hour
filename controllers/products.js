import express from "express"
import access_control from "../access_control.js";
import * as Products from "../models/products.js"
import * as ProductsFeatures from "../models/products-feature.js"
import * as ChangeLog from "../models/changelog.js"

const productController = express.Router()

productController.get("/product_list", (request, response) => {
    if (request.query.search_term) {
        Products.getBySearch(request.query.search_term).then(products => {
            response.status(200).render("product_list.ejs", { products })
        }).catch(error => {
            response.status(500).send("An error happened! " + error)
        })
    } else {
        Products.getAll().then(products => {
            response.status(200).render("product_list.ejs", { products })
        }).catch(error => {
            response.status(500).send("An error happened! " + error)
        })
    }
})

productController.get("/product_all", (request, response) => {
    if (request.query.search_term) {
        Products.getBySearch(request.query.search_term).then(products => {
            response.status(200).render("product_all.ejs", { products })
        }).catch(error => {
            response.status(500).send("An error happened! " + error)
        })
    } else {
        Products.getAll().then(products => {
            response.status(200).render("product_all.ejs", { products })
        }).catch(error => {
            response.status(500).send("An error happened! " + error)
        })
    }
})

productController.get("/product_brand", (request, response) => {
    if (request.query.search_term) {
        Products.getBySearch(request.query.search_term).then(products => {
            response.status(200).render("product_brand.ejs", { products })
        }).catch(error => {
            response.status(500).send("An error happened! " + error)
        })
    } else {
        // We use the `getAllWithFeatures()` function from `models/products-feature.js` here as it retrieves the additional data you need
        ProductsFeatures.getAllWithFeatures().then(products => {
            response.status(200).render("product_brand.ejs", { products })
        }).catch(error => {
            response.status(500).send("An error happened! " + error)
        })
    } 
})

productController.get("/product_price", (request, response) => {
    if (request.query.search_term) {
        Products.getBySearch(request.query.search_term).then(products => {
            response.status(200).render("product_price.ejs", { products })
        }).catch(error => {
            response.status(500).send("An error happened! " + error)
        })
    } else {
        ProductsFeatures.getAllWithFeatures().then(products => {
            console.log("debugger:", products)
            response.status(200).render("product_price.ejs", { products })
        }).catch(error => {
            response.status(500).send("An error happened! " + error)
        })
    }
})

productController.get("/product_stock", (request, response) => {
    Products.getAll().then(products => {
        response.status(200).render("product_stock.ejs", { products: products.filter(product => product.stock > 0) })
    }).catch(error => {
        response.status(500).send("An error happened! " + error)
    })
})

productController.get("/product_admin", 
    access_control(["admin"]),
    (request, response) => {
        ProductsFeatures.getAllWithFeatures().then(products => {
            response.status(200).render("product_admin_list.ejs", { 
                products: products, 
                accessRole: request.session.user.accessRole 
            })
        }).catch(error => {
            response.status(500).send("An error happened! " + error)
        })
    })

productController.get("/product_admin/edit", 
    access_control(["admin"]),
    (request, response) => {

        // Get the id
        if (request.query.id) {
            const productId = request.query.id

            Products.getById(productId).then(product => {
                response.status(200).render("product_admin_edit.ejs", { 
                    editProduct: product, 
                    accessRole: request.session.user.accessRole 
                })
            }).catch(error => {
                response.status(500).send("An error happened! " + error)
            })
        } else {
            // Handle errors!
            response.status(400).send("product id missing from url")
        }
    })

productController.post("/product_admin/edit", 
    access_control(["admin"]),
    (request, response) => {

        console.log(request.session.user)

        // Get the id
        if (request.query.id) {
            const productId = request.query.id

            // get the POST request payload
            const formData = request.body;

            let updateModel = {
                product_id: formData.id,
                product_name: formData.name, 
                product_stock: formData.stock, 
                price: formData.price,
                product_description: formData.description,
                brand: formData.brand,
                staff_id_updated_by: request.session.user.staffID
            }

            if (updateModel.product_id > 0) {
                Products.update(updateModel).then(result => {

                    ChangeLog.create({
                        date: (new Date().toISOString().slice(0, 19).replace("T", " ")), 
                        product_id: updateModel.product_id, 
                        message: `Product updated with id: ${result[0].insertId}.`
                    }).then(changelog => {
                        response.redirect("/product_admin");
                    })

                }).catch(error => {
                    response.status(500).send("An error happened! " + error)
                })
            } else {
                Products.create(updateModel).then(result => {

                    ChangeLog.create({
                        date: (new Date().toISOString().slice(0, 19).replace("T", " ")), 
                        product_id: result[0].insertId, 
                        message: `Product created with id: ${result[0].insertId}.`
                    }).then(changelog => {
                        response.redirect("/product_admin");
                    })

                }).catch(error => {
                    response.status(500).send("An error happened! " + error)
                })
            }

        } else {
            // Handle errors!
            response.status(400).send("product id missing from url")
        }
    })

productController.get("/product_admin/create", 
    access_control(["admin"]),
    (request, response) => {

        response.status(200).render("product_admin_edit.ejs", { 
            editProduct: {
                id: 0,
                name: '',
                stock: '',
                price: '',
                description: '',
                staff_id_updated_by: '',
                feature_id: 0,
                brand: ''
            }, 
            accessRole: request.session.user.accessRole 
        })
    })

productController.get("/product_checkout", (request, response) => {
    // Check if there's a selected product in the url
    if (request.query.id) {
        // Load details of the selected product
        Products.getById(request.query.id).then(product => {
            // Render checkout page view with selected product
            response.render("product_checkout.ejs", { product })
        }).catch(error => {
            response.status(500).send("An error happened! " + error)
        })
    }
})

export default productController