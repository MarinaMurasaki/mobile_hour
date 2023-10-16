import { db_conn } from "../database.js"

export function newProductWithFeatures(
  product_id,
  product_name,
  product_stock,
  product_price,
  product_description,
  last_updated_by_staff_id,
  feature_id,
  weight,
  dimensions,
  OS,
  screensize,
  resolution,
  CPU,
  RAM,
  storage,
  rare_camera,
  front_camera,
  brand
) {
  return {
      product_id,
      product_name,
      product_stock,
      product_price,
      product_description,
      last_updated_by_staff_id,
      feature_id,
      weight,
      dimensions,
      OS,
      screensize,
      resolution,
      CPU,
      RAM,
      storage,
      rare_camera,
      front_camera,
      brand
  }
}

export function getAllWithFeatures() {
  //Nested Query to join feature_id in product table with feature table
  return db_conn.query("SELECT * FROM products INNER JOIN feature ON products.feature_id = feature.feature_id")
      .then(([queryResult]) => {
          console.log("feature result:", queryResult)
          // convert each result into a model object
          return queryResult.map(
              result => newProductWithFeatures(
                  result.product_id,
                  result.product_name,
                  result.product_stock,
                  result.price,
                  result.product_description,
                  result.last_updated_by_staff_id,
                  result.feature_id,
                  result.weight,
                  result.dimensions,
                  result.OS,
                  result.screensize,
                  result.resolution,
                  result.CPU,
                  result.RAM,
                  result.storage,
                  result.rare_camera,
                  result.front_camera,
                  result.brand
              )
          )

      })
}