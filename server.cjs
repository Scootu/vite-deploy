const express = require("express");
const cors = require("cors");
const path = require("path");

const { google } = require("googleapis");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri =
  "mongodb+srv://anes02:VU1rahcTUVI7QMpq@cluster0.9pzjkap.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
}
// Endpoint to handle new order requests
app.post("/api/orders", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const spreadsheetId = "1iDD35caRGiRh6WHyMn66XxC3_VFTvB9EMKUl-K-LMtE";
    // create client instance for auth
    const cliente = await auth.getClient();
    // create instance of Google Sheets API

    const googleSheets = google.sheets({ version: "v4", auth: cliente });

    //get rows data
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1",
    });
    //Write in google sheet API

    const newOrdersData = req.body;
    // let orders = Object.values(newOrdersData[0]);
    let orders = [];
    // i do this because Object.values() doesn't work for some risent it's return an object !
    orders.push(newOrdersData[0].billing_first_name);
    orders.push(newOrdersData[0].billing_Last_name);
    orders.push(newOrdersData[0].billing_Company_name);
    orders.push(newOrdersData[0].billing_phone);
    orders.push(newOrdersData[0].billing_State);
    orders.push(newOrdersData[0].billing_city);
    orders.push(newOrdersData[0].billing_address_1);
    orders.push(newOrdersData[0].billing_address_2);
    orders.push(
      newOrdersData[0].productData.products
        .map(
          (item) =>
            `Title: ${item.title}, Quantity: ${item.quantity}, Price: ${item.price}`
        )
        .join("\n")
    );

    orders.push(newOrdersData[0].productData.totalPrice);
    orders.push(newOrdersData[0].productData.totalItems);
    orders.push(newOrdersData[0].billing_email);
    orders.push(newOrdersData[0].order_comments);
    // Insert the new order data into a MongoDB collection
    const database = client.db("planterBot");
    const collection = database.collection("NEWOrder");

    const result = await collection.insertMany(newOrdersData);

    // Check if the insertion was successful
    if (result.insertedCount === newOrdersData.length) {
      // Get the current date and time
      const currentDate = new Date();

      // Create an object to store the current date and time

      // Get the current date
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Note: Months are zero-indexed (0 for January)
      const day = currentDate.getDate();

      // Get the current time
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
      orders.unshift(result.insertedIds[0]); // add id
      orders.unshift(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
      const writeRows = await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [orders],
        },
      });

      res.status(201).json({
        message: "New orders added successfully",
        data: orders,
        id: result.insertedIds,
      });
    } else {
      throw new Error("Failed to add new orders");
    }
  } catch (error) {
    console.error("Error adding a new order:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/validate-code", async (req, res) => {
  try {
    const userCodePromo = req.body.userCodePromo;

    // Add your validation login here
    const isValidCode = validatePromoCode(userCodePromo);

    if (isValidCode) {
      res.json({ ok: true, code: userCodePromo });
    } else {
      res.json({
        ok: false,
        message: "Invalid promotion code",
        code: userCodePromo,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Handle root path
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Handle product API path
app.get("/api/product/:productId", (req, res) => {
  const productId = req.params.productId;

  try {
    // Assuming productData.json is in the public directory
    const productDataPath = path.join(__dirname, "public", "productData.json");
    const products = require(productDataPath);

    const product = products.find((p) => p.id === productId);

    if (product) {
      res.setHeader("Content-Type", "application/json"); // Set Content-Type header
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error reading product data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  run().catch(console.dir);
});
// Function to validate the promotion code (add your validation logic here)
function validatePromoCode(code) {
  // Example: Check if the code is "ABC123"
  return code === "ABC123";
}
