import express from "express"
import access_control from "../access_control.js";
import * as Changelog from "../models/changelog.js"

const productController = express.Router()

productController.get("/changelog", access_control(["admin"]), (request, response) => {
    Changelog.getAll().then(changelogs => {
        response.status(200).render("change_log.ejs", { 
            changelogs,
            accessRole: request.session.user.accessRole 
        })
    }).catch(error => {
        response.status(500).send("An error happened! " + error)
    })
})

export default productController