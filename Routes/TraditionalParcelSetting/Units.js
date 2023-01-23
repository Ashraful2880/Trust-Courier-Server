module.exports = function (app, Units, ObjectId) {
	//To post new unit
	app.post("/unit", async (req, res) => {
		const newunit = req.body;
		const result = await Units.insertOne(newunit);
		res.json(result);
	});

	// To update single unit data
	app.put("/unit/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updateunit = {
			$set: {
				unitName: updatedReq.unitName,
			},
		};
		const result = await Units.updateOne(findId, updateunit, options);
		res.json(result);
	});
	// To update single unit Status
	app.put("/unitStatus/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updateunit = {
			$set: {
				status: updatedReq.status,
			},
		};
		const result = await Units.updateOne(findId, updateunit, options);
		res.json(result);
	});
	//To Show all units
	app.get("/units", async (req, res) => {
		const get = Units.find({});
		allunits = await get.toArray();
		res.send(allunits);
	});
	//To load single unit by id
	app.get("/unit/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const result = await Units.findOne(findId);
		res.send(result);
	});
	//To Delete unit one by one
	app.delete("/unit/:id", async (req, res) => {
		const id = req.params.id;
		const deleteId = { _id: ObjectId(id) };
		const result = await Units.deleteOne(deleteId);
		res.send(result);
	});
};
