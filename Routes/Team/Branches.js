module.exports = function (app, Branches, AllUsers, ObjectId) {
	//To post new Branch
	app.post("/branch", async (req, res) => {
		const newBranch = req.body;
		const result = await Branches.insertOne(newBranch);
		await AllUsers.insertOne({
			name: newBranch.branchName,
			email: newBranch.branchEmail,
			userRole: "Branch",
			joinTime: new Date().toLocaleString("en-US", {
				timeZone: "Asia/Dhaka",
			}),
			status: "Active",
		});
		res.json(result);
	});

	// To update single Branch data
	app.put("/branch/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updateBranch = {
			$set: {
				branchName: updatedReq.branchName,
				branchAddress: updatedReq.branchAddress,
				branchDistrict: updatedReq.branchDistrict,
				branchArea: updatedReq.branchArea,
				branchContact: updatedReq.branchContact,
				branchEmail: updatedReq.branchEmail,
				branchPassword: updatedReq.branchImage,
				warehouseInfo: updatedReq.warehouseInfo,
				pickupCom: updatedReq.pickupCom,
				deliveryCom: updatedReq.deliveryCom,
				bookingCom: updatedReq.bookingCom,
				officeDeliveryCom: updatedReq.officeDeliveryCom,
			},
		};
		const result = await Branches.updateOne(findId, updateBranch, options);
		res.json(result);
	});
	// To update single Branch Status
	app.put("/branchStatus/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updateBranch = {
			$set: {
				status: updatedReq.status,
			},
		};
		const result = await Branches.updateOne(findId, updateBranch, options);
		res.json(result);
	});
	//To Show all Branches
	app.get("/branches", async (req, res) => {
		const get = Branches.find({});
		allBranches = await get.toArray();
		res.send(allBranches);
	});
	//To load single Branch by id
	app.get("/branch/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const result = await Branches.findOne(findId);
		res.send(result);
	});
	//To load single Branch by email
	app.get("/branchbyemail/:email", async (req, res) => {
		const emailIn = req.params.email;
		const findId = { branchEmail: emailIn };
		const result = await Branches.findOne(findId);
		res.send(result);
	});
	//To Delete Branch one by one
	app.delete("/branch/:id", async (req, res) => {
		const id = req.params.id;
		const deleteId = { _id: ObjectId(id) };
		const find = await Branches.findOne(deleteId);
		const delEmail = find?.branchEmail;
		await AllUsers.deleteOne({ email: delEmail });
		const result = await Branches.deleteOne(deleteId);
		res.send(result);
	});
};
