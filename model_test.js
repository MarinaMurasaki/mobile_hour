// // staff.js
// // import { newStaff, create } from "./models/staff.js";
// // import bcrypt from "bcryptjs";

// // const staff = newStaff(
// //   null,
// //   "Marina",
// //   "Murasaki",
// //   "admin",
// //   "admin",
// //   bcrypt.hashSync("abc123")
// // )

// // create(staff)
// // .then(result => {
// //   console.log("Query finished running");
// //   console.log(result);
// // })
// // .catch(error => {
// //   console.error("Error while executing the query:");
// //   console.error(error);
// // });

// import { newFeature, create } from "./models/feature.js";

// const feature = newFeature(
//   null,
//   800,
//   "800*800",
//   "none",
//   "none",
//   "none",
//   "none",
//   "none",
//   "none",
//   "none",
//   "apple"
// )

// create()
// .then(result => {
//   console.log("Query finished running");
//   console.log(result);
// })
// .catch(error => {
//   console.error("Error while executing the query:");
//   console.error(error);
// });

// import { newChangelog, create } from "./models/changelog.js";

// const changelog_date = new Date().toISOString().slice(0, 19).replace("T", " ");
// const changelog = newChangelog(
//   null,
//   changelog_date,
//   1,
//   "none"
// );

// create(changelog) // Pass the changelog object as an argument
//   .then(result => {
//     console.log("Query finished running");
//     console.log(result);
//   })
//   .catch(error => {
//     console.error("Error while executing the query:");
//     console.error(error);
//   });

