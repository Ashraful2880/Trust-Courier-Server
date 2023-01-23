const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

//To select ID from MongoDB
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//MongoDB linking

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@trust-courier.w2eifuo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function run() {
	try {
		await client.connect();

		//DB Folder and Subfolders

		const database = client.db("Trust_Courier");

		//all users

		const AllUsers = database.collection("AllUsers");

		//Team Settings

		const Branches = database.collection("Branches");
		const Merchants = database.collection("Merchants");
		const Riders = database.collection("Riders");
		const WarehouseUsers = database.collection("Warehouses");

		//Application Settings

		const WeightPackages = database.collection("Weight-Packages");
		const ServiceAreas = database.collection("Service-Areas");
		const Districts = database.collection("Districts");
		const Area = database.collection("Area");

		///Traditional Parcel Settings

		const Vehicles = database.collection("Vehicles");
		const ItemCategory = database.collection("Item-Category");
		const Units = database.collection("Units");

		//Manage Order Booking

		const MerchantOrder = database.collection("Merchant-Order");

		//Require Routes

		//All Users
		require("./Routes/AllUsers/AllUsers")(app, AllUsers, ObjectId);

		//Team Settings
		require("./Routes/Team/Branches")(app, Branches, AllUsers, ObjectId);
		require("./Routes/Team/Merchants")(app, Merchants, AllUsers, ObjectId);
		require("./Routes/Team/Riders")(app, Riders, AllUsers, ObjectId);
		require("./Routes/Team/WarehouseUsers")(
			app,
			WarehouseUsers,
			AllUsers,
			ObjectId,
		);

		//Application Settings
		require("./Routes/ApplicationSettings/Districts")(app, Districts, ObjectId);
		require("./Routes/ApplicationSettings/WeightPackages")(
			app,
			WeightPackages,
			ObjectId,
		);
		require("./Routes/ApplicationSettings/Area")(app, Area, ObjectId);
		require("./Routes/ApplicationSettings/ServiceAreas")(
			app,
			ServiceAreas,
			ObjectId,
		);

		///Traditional Parcel Settings
		require("./Routes/TraditionalParcelSetting/Vehicles")(
			app,
			Vehicles,
			ObjectId,
		);
		require("./Routes/TraditionalParcelSetting/ItemCategory")(
			app,
			ItemCategory,
			ObjectId,
		);
		require("./Routes/TraditionalParcelSetting/Units")(app, Units, ObjectId);

		//Manage Order Booking
		require("./Routes/ManageOrderBooking/MerchantOrder")(
			app,
			MerchantOrder,
			ObjectId,
		);


	} finally {
		//await client.close();
	}
}
run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("Trust-Courier Server is running Just Fine");
});

app.listen(port, () => {
	console.log("Trust-Courier Server running on port :", port);
});
