import { db_conn } from "../database.js";

export function newChangelog(
    id,
    date,
    product_id,
    message,
) {
    return {
        id,
        date,
        product_id,
        message
    }
}

export function getAll() {
    return db_conn.query("SELECT * FROM changelog")
        .then(([queryResult]) => {
            // convert each result into a model object
            return queryResult.map(
                result => newChangelog(
                    result.changelog_id,
                    result.date,
                    result.product_id,
                    result.message
                )
            )

        })
}

export function create(changelog) {
    return db_conn.query(`
    INSERT INTO changelog
    (date, product_id, message)
    VALUES (?, ?, ?)
    `, [changelog.date, changelog.product_id, changelog.message])
}