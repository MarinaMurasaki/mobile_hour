import express from "express"
import * as Feature from "../models/feature.js"

const orderController = express.Router()

orderController.get("/feature", (request, response) => {
    // Check if the query string has the order id
    if (request.query.id) {
        const featureId = request.query.id
        // TODO: Validate the id

        // Get order by id
        Orders.getById(featureId).then(feature => {
            // Send back order details
            response.status(200).send(
                "Feature for " + feature
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