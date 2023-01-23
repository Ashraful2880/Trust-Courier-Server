module.exports = function (app, Riders, AllUsers, ObjectId) {
	//To post new rider
	app.post("/rider", async (req, res) => {
		const newrider = req.body;
		const result = await Riders.insertOne(newrider);
		await AllUsers.insertOne({
			name: newrider.riderName,
			email: newrider.riderEmail,
			userRole: "Rider",
			joinTime: new Date().toLocaleString("en-US", {
				timeZone: "Asia/Dhaka",
			}),
			status: "Active",
		});
		res.json(result);
	});

	// To update single rider data
	app.put("/rider/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updaterider = {
			$set: {
				riderName: updatedReq.riderName,
				riderBranch: updatedReq.riderBranch,
				riderAddress: updatedReq.riderAddress,
				riderContact: updatedReq.riderContact,
				riderEmail: updatedReq.riderEmail,
				riderPassword: updatedReq.riderPassword,
				riderNID: updatedReq.riderNID,
				riderLicense: updatedReq.riderLicense,
				riderDOB: updatedReq.riderDOB,
			},
		};
		const result = await Riders.updateOne(findId, updaterider, options);
		res.json(result);
	});
	// To update single rider Status
	app.put("/riderStatus/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updaterider = {
			$set: {
				status: updatedReq.status,
			},
		};
		const result = await Riders.updateOne(findId, updaterider, options);
		res.json(result);
	});
	//To Show all riders
	app.get("/riders", async (req, res) => {
		const get = Riders.find({});
		allriders = await get.toArray();
		res.send(allriders);
	});
	//To Show filtered riders
	app.get("/ridersbybranch/:branchName", async (req, res) => {
		const branchName = req.params.branchName;
		const get = Riders.find({});
		allriders = await get.toArray();
		const filter = allriders.filter(
			(rider) => rider?.riderBranch === branchName,
		);
		res.send(filter);
	});

	//To load single rider by email
	app.get("/riderByEmail/:email", async (req, res) => {
		const emailIn = req.params.email;
		const findId = { riderEmail: emailIn };
		const result = await Riders.findOne(findId);
		res.send(result);
	});
	//To load single rider by id
	app.get("/rider/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const result = await Riders.findOne(findId);
		res.send(result);
	});
	//To Delete rider one by one
	app.delete("/rider/:id", async (req, res) => {
		const id = req.params.id;
		const deleteId = { _id: ObjectId(id) };
		const find = await Riders.findOne(deleteId);
		const delEmail = find?.riderEmail;
		await AllUsers.deleteOne({ email: delEmail });
		const result = await Riders.deleteOne(deleteId);
		res.send(result);
	});
};
