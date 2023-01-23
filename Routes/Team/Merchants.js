module.exports = function (app, Merchants, AllUsers, ObjectId) {
	//To post new merchant
	app.post("/merchant", async (req, res) => {
		const newBranch = req.body;
		const result = await Merchants.insertOne(newBranch);
		await AllUsers.insertOne({
			name: newBranch.merchantName,
			email: newBranch.merchantEmail,
			userRole: "Merchant",
			joinTime: new Date().toLocaleString("en-US", {
				timeZone: "Asia/Dhaka",
			}),
			status: "Active",
		});
		res.json(result);
	});

	// To update single merchant data
	app.put("/merchant/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updateMerchant = {
			$set: {
				merchantName: updatedReq.merchantName,
				merchantCompanyName: updatedReq.merchantCompanyName,
				merchantAddress: updatedReq.merchantAddress,
				merchantBusinessAddress: updatedReq.merchantBusinessAddress,
				merchantDistrict: updatedReq.merchantDistrict,
				merchantBranchName: updatedReq.merchantBranchName,
				merchantArea: updatedReq.merchantArea,
				merchantContact: updatedReq.merchantContact,
				merchantEmail: updatedReq.merchantEmail,
				merchantPassword: updatedReq.merchantPassword,
			},
		};
		const result = await Merchants.updateOne(findId, updateMerchant, options);
		res.json(result);
	});
	// To update single merchant Status
	app.put("/merchantStatus/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updateMerchant = {
			$set: {
				status: updatedReq.status,
			},
		};
		const result = await Merchants.updateOne(findId, updateMerchant, options);
		res.json(result);
	});
	//To Show all merchants
	app.get("/merchants", async (req, res) => {
		const get = Merchants.find({});
		allBranches = await get.toArray();
		res.send(allBranches);
	});
	//To load single merchant by email
	app.get("/merchants/:email", async (req, res) => {
		const emailIn = req.params.email;
		const findId = { merchantEmail: emailIn };
		const result = await Merchants.findOne(findId);
		res.send(result);
	});
	//To load single merchant by id
	app.get("/merchant/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const result = await Merchants.findOne(findId);
		res.send(result);
	});
	//To Delete merchant one by one
	app.delete("/merchant/:id", async (req, res) => {
		const id = req.params.id;
		const deleteId = { _id: ObjectId(id) };
		const find = await Merchants.findOne(deleteId);
		const delEmail = find?.merchantEmail;
		await AllUsers.deleteOne({ email: delEmail });
		const result = await Merchants.deleteOne(deleteId);
		res.send(result);
	});
};
