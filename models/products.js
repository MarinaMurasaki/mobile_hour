import { db_conn } from "../database.js";

export function newProduct(
    id,
    name,
    stock,
    price,
    description,
    staff_id_updated_by,
    feature_id,
    brand
) {
    return {
        id,
        name,
        stock,
        price,
        description,
        staff_id_updated_by,
        feature_id,
        brand
    }
}

export function getAll() {
    return db_conn.query("SELECT * FROM products")
        .then(([queryResult]) => {
            // convert each result into a model object
            return queryResult.map(
                result => newProduct(
                    result.product_id,
                    result.product_name,
                    result.product_stock,
                    result.price,
                    result.product_description,
                    result.last_updated_by_staff_id,
                    result.feature_id,
                    result.brand
                )
            )

        })
}




export function getById(productID) {
    return db_conn.query("SELECT * FROM products WHERE product_id = ?", [
        productID,
    ]).then(([queryResult]) => {
        // check that at least 1 order was found
        if (queryResult.length > 0) {
            // get the first matching result
            const result = queryResult[0]

            // convert result into a model object
            return newProduct(
                result.product_id,
                result.product_name,
                result.product_stock,
                result.price,
                result.product_description,
                result.last_updated_by_staff_id,
                result.feature_id,
                result.brand
            )
        } else {
            return Promise.reject("no matching results")
        }

    })
}

export function getBySearch(searchTerm) {
    return db_conn.query(
        "SELECT * FROM products WHERE product_name LIKE ? OR product_description LIKE ?",
        [`%${searchTerm}%`, `%${searchTerm}%`]
    ).then(([queryResult]) => {
        // convert each result into a model object
        return queryResult.map(
            result => newProduct(
                result.product_id,
                result.product_name,
                result.product_stock,
                result.price,
                result.product_description,
                result.last_updated_by_staff_id,
                result.feature_id,
            )
        )

    })
}

export function create(product) {
    return db_conn.query(
        `
        INSERT INTO products 
        (product_name, product_stock, price, product_description, staff_id_updated_by, brand, feature_id) 
        VALUES (?, ?, ?, ?, ?, ?, 1)
    `,
        [product.product_name, product.product_stock, product.price, product.product_description, product.staff_id_updated_by, product.brand]
    );
}

export function update(product) {
    return db_conn.query(
        `
        UPDATE products
        SET product_name = ?, product_stock = ?, price = ?, product_description = ?, staff_id_updated_by = ?, brand = ?
        WHERE product_id = ${product.product_id}
    `,
        [product.product_name, product.product_stock, product.price, product.product_description, product.staff_id_updated_by, product.brand ]
    );
}

export function deleteById(productID) {
    return db_conn.query("DELETE FROM products WHERE product_id = ?", [`
        UPDATE products
        SET product_removed = 1
        WHERE product_id = ?
        `, [productID] 
]);
}


