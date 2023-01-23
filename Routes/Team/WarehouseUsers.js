module.exports = function (app, WarehouseUsers, AllUsers, ObjectId) {
	//To post new warehouseUser
	app.post("/warehouseUser", async (req, res) => {
		const newwarehouseUser = req.body;
		const result = await WarehouseUsers.insertOne(newwarehouseUser);
		await AllUsers.insertOne({
			name: newwarehouseUser.warehouseUserName,
			email: newwarehouseUser.warehouseUserEmail,
			userRole: "Warehouse",
			joinTime: new Date().toLocaleString("en-US", {
				timeZone: "Asia/Dhaka",
			}),
			status: "Active",
		});
		res.json(result);
	});

	// To update single warehouseUser data
	app.put("/warehouseUser/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updatewarehouseUser = {
			$set: {
				warehouseUserName: updatedReq.warehouseUserName,
				warehouseUserAddress: updatedReq.warehouseUserAddress,
				warehouseDistrict: updatedReq.waerehouseDistrict,
				wareHouseName: updatedReq.wareHouseName,
				warehouseUserContact: updatedReq.warehouseUserContact,
				warehouseUserEmail: updatedReq.warehouseUserEmail,
				warehouseUserPassword: updatedReq.warehouseUserPassword,
			},
		};
		const result = await WarehouseUsers.updateOne(
			findId,
			updatewarehouseUser,
			options,
		);
		res.json(result);
	});
	// To update single warehouseUser Status
	app.put("/warehouseUserStatus/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updatewarehouseUser = {
			$set: {
				status: updatedReq.status,
			},
		};
		const result = await WarehouseUsers.updateOne(
			findId,
			updatewarehouseUser,
			options,
		);
		res.json(result);
	});
	//To Show all warehouseUsers
	app.get("/warehouseUsers", async (req, res) => {
		const get = WarehouseUsers.find({});
		allwarehouseUsers = await get.toArray();
		res.send(allwarehouseUsers);
	});
	//To load single warehouseUser by email
	app.get("/warehouseUserByEmail/:email", async (req, res) => {
		const emailIn = req.params.email;
		const findId = { warehouseUserEmail: emailIn };
		const result = await WarehouseUsers.findOne(findId);
		res.send(result);
	});
	//To load single warehouseUser by email
	app.get("/warehouseUserByEmail/:email", async (req, res) => {
		const emailIn = req.params.email;
		const findId = { warehouseUserEmail: emailIn };
		const result = await WarehouseUsers.findOne(findId);
		res.send(result);
	});
	//To load single warehouseUser by id
	app.get("/warehouseUser/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const result = await WarehouseUsers.findOne(findId);
		res.send(result);
	});
	//To Delete warehouseUser one by one
	app.delete("/warehouseUser/:id", async (req, res) => {
		const id = req.params.id;
		const deleteId = { _id: ObjectId(id) };
		const find = await WarehouseUsers.findOne(deleteId);
		const delEmail = find?.warehouseUserEmail;
		await AllUsers.deleteOne({ email: delEmail });
		const result = await WarehouseUsers.deleteOne(deleteId);
		res.send(result);
	});
};
