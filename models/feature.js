import { db_conn } from "../database.js";

export function newFeature(
    id,
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
      id,
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

export function create(feature) {
    return db_conn.query(`
    INSERT INTO feature
    (feature_dimensions, feature_OS, feature_screensize, feature_CPU, feature_RAM, feature_storage, feature_rare_camera, feature_front_camera, feature_brand)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [feature.dimensions, feature.OS, feature.screensize, feature.CPU, feature.RAM, feature.storage, feature.rare_camera, feature.front_camera, feature.brand])
}

