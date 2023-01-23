module.exports = function (app, ServiceAreas, ObjectId) {
	//To post new serviceArea
	app.post("/serviceArea", async (req, res) => {
		const newserviceArea = req.body;
		const result = await ServiceAreas.insertOne(newserviceArea);
		res.json(result);
	});

	// To update single serviceArea data
	app.put("/serviceArea/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updateserviceArea = {
			$set: {
				serviceAreaName: updatedReq.serviceAreaName,
				serviceAreaCODPercentage: updatedReq.serviceAreaCODPercentage,
				serviceAreaCharge: updatedReq.serviceAreaCharge,
				returnCharge: updatedReq.returnCharge,
			},
		};
		const result = await ServiceAreas.updateOne(
			findId,
			updateserviceArea,
			options,
		);
		res.json(result);
	});
	// To update single serviceArea Status
	app.put("/serviceAreaStatus/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updateserviceArea = {
			$set: {
				status: updatedReq.status,
			},
		};
		const result = await ServiceAreas.updateOne(
			findId,
			updateserviceArea,
			options,
		);
		res.json(result);
	});
	//To Show all serviceAreas
	app.get("/serviceAreas", async (req, res) => {
		const get = ServiceAreas.find({});
		allserviceAreas = await get.toArray();
		res.send(allserviceAreas);
	});
	//To load single serviceArea by id
	app.get("/serviceArea/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const result = await ServiceAreas.findOne(findId);
		res.send(result);
	});
	//To Delete serviceArea one by one
	app.delete("/serviceArea/:id", async (req, res) => {
		const id = req.params.id;
		const deleteId = { _id: ObjectId(id) };
		const result = await ServiceAreas.deleteOne(deleteId);
		res.send(result);
	});
};
