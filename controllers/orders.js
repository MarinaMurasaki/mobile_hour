import express from "express"
import access_control from "../access_control.js";
import * as Orders from "../models/orders.js"

const orderController = express.Router()

orderController.get(
    "/order_admin", 
    access_control(["admin"]),
    (request, response) => {
        // get orders
        let orders = Orders.getAll().then(orders => {

            response.status(200).render("order_admin.ejs", { 
                orders: orders,
                accessRole: request.session.user.accessRole
            })
        }).catch(error => {
            
            response.status(500).send("An error happened! " + error)
        })
    }
)

orderController.post("/create_order", (request, response) => {
    // Check that we received form data!
    if (request.body) {
        const formData = request.body
        // TODO: Validate data formats

        // Construct an order
        const newOrder = Orders.newOrder(
            null,
            "pending",
            (new Date().toISOString().slice(0, 19).replace("T", " ")),
            // TODO: Sanitise form inputs! 
            formData.customer_first_name,
            formData.customer_last_name,
            formData.customer_phone,
            formData.customer_email,
            formData.product_id
        )

        // Save order to database
        Orders.create(newOrder).then(([result]) => {
            const orderId = result.insertId

            // Send order details
            response.status(200).send("Order created with id " + orderId)
        }).catch(error => {
            // Handle errors!!!
            response.status(500).send("Failed to create order: " + error)
        })
    } else {
        // Handle errors!!!
        response.status(400).send("missing order details in request body")
    }
})

orderController.get("/order_confirmation", (request, response) => {
    // Check if the query string has the order id
    if (request.query.id) {
        const orderId = request.query.id
        // TODO: Validate the id

        // Get order by id
        Orders.getById(orderId).then(order => {
            // Send back order details
            response.status(200).send(
                "Order for " + order.customer_first_name
                + " is " + order.status
            )
        }).catch(error => {
            // Handle errors!
            response.status(500).send("failed to get order: " + error)
        })
    } else {
        // Handle errors!
        response.status(400).send("order id missing from url")
    }
})

export default orderController  