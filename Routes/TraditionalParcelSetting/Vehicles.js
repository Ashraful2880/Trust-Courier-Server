module.exports = function (app, Vehicles, ObjectId) {
	//To post new vehicle
	app.post("/vehicle", async (req, res) => {
		const newvehicle = req.body;
		const result = await Vehicles.insertOne(newvehicle);
		res.json(result);
	});

	// To update single vehicle data
	app.put("/vehicle/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updatevehicle = {
			$set: {
				vehicleName: updatedReq.vehicleName,
				vehicleSLNo: updatedReq.vehicleSLNo,
				vehicleNo: updatedReq.vehicleNo,
				vehicleDriverName: updatedReq.vehicleDriverName,
				vehicleDriverContact: updatedReq.vehicleDriverContact,
				vehicleRoot: updatedReq.vehicleRoot,
			},
		};
		const result = await Vehicles.updateOne(findId, updatevehicle, options);
		res.json(result);
	});
	// To update single vehicle Status
	app.put("/vehicleStatus/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updatevehicle = {
			$set: {
				status: updatedReq.status,
			},
		};
		const result = await Vehicles.updateOne(findId, updatevehicle, options);
		res.json(result);
	});
	//To Show all vehicles
	app.get("/vehicles", async (req, res) => {
		const get = Vehicles.find({});
		allvehicles = await get.toArray();
		res.send(allvehicles);
	});
	//To load single vehicle by id
	app.get("/vehicle/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const result = await Vehicles.findOne(findId);
		res.send(result);
	});
	//To Delete vehicle one by one
	app.delete("/vehicle/:id", async (req, res) => {
		const id = req.params.id;
		const deleteId = { _id: ObjectId(id) };
		const result = await Vehicles.deleteOne(deleteId);
		res.send(result);
	});
};
