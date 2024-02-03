// Import Inventory Database
// mongorestore -d inventoryDB /path/to/inventoryDB
// Imported successfully.

// use InventoryDB
use InventoryDB

// Display Number of Products Per Category

db.products.aggregate([

  { $group: { _id: "$category", count: { $sum: 1 } } }

])


// Display Max Category Products Price

db.products.aggregate([

  { $group: { _id: "$category", maxPrice: { $max: "$price" } } }

])



// Display User Ahmed Orders Populated with Product

db.users.aggregate([

  { $match: { name: "ahmed" } },

  { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "userOrders" } },

  { $unwind: "$userOrders" },

  { $lookup: { from: "products", localField: "userOrders.productsIds", foreignField: "_id", as: "orderProducts" } }

])



// Get User Ahmed's Highest Order Price

db.users.aggregate([

  { $match: { name: "ahmed" } },

  { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "userOrders" } },

  { $unwind: "$userOrders" },

  { $lookup: { from: "products", localField: "userOrders.productsIds", foreignField: "_id", as: "orderProducts" } },

  { $unwind: "$orderProducts" },

  { $group: { _id: "$_id", maxOrderPrice: { $max: { $multiply: ["$orderProducts.price", "$orderProducts.quantity"] } } } }

])



// ==========================================================



// Import Books.json

// mongoimport --db booksDB --collection books --file /path/to/books.json --jsonArray

// Imported successfully.



// Use BooksDB

use BooksDB

//- Running aggregation queries that use multiple stages ($match, $group, $count, $skip, $limit, $lookup, $sortByCount etc).

// Query : Get Published Book Categories with Counts (Skipped First 5, Limited to 10)

db.books.aggregate([

  // Stage 1: Match books with the status "PUBLISH"

  { $match: { status: "PUBLISH" } },

  // Stage 2: Group books by category and count the number of books in each category

  { $group: { _id: "$categories", count: { $sum: 1 } } },

  // Stage 3: Sort the results by count in descending order

  { $sortByCount: "$count" },

  // Stage 4: Skip the first 5 categories

  { $skip: 5 },

  // Stage 5: Limit the results to 10 categories

  { $limit: 10 }

]);



//- Using $project and $addFields with operator expressions such as ($getField, $first, $concat, $dateToString, $arrayElemAt etc).

// Query : Project Specific Fields and Add a Custom Field

db.books.aggregate([

  // Stage 1: Project specific fields from the documents

  {

    $project: {

      title: 1,

      authors: 1,

      pageCount: 1,

      // Use $dateToString to format the publishedDate

      formattedDate: { $dateToString: { format: "%Y-%m-%d", date: "$publishedDate" } }

    }

  },

  // Stage 2: Add a new field combining title and the first author

  {

    $addFields: {

      customField: {

        $concat: ["$title", " by ", { $arrayElemAt: ["$authors", 0] }]

      }

    }

  }

]);


//- Using $unwind.

db.books.aggregate([

  { $unwind: "$authors" }

]);

