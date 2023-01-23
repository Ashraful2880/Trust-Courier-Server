module.exports = function (app, Districts, ObjectId) {
	//To post new district
	app.post("/district", async (req, res) => {
		const newdistrict = req.body;
		const result = await Districts.insertOne(newdistrict);
		res.json(result);
	});

	// To update single district data
	app.put("/district/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updatedistrict = {
			$set: {
				district: updatedReq.district,
			},
		};
		const result = await Districts.updateOne(findId, updatedistrict, options);
		res.json(result);
	});
	// To update single district Status
	app.put("/districtStatus/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updatedistrict = {
			$set: {
				status: updatedReq.status,
			},
		};
		const result = await Districts.updateOne(findId, updatedistrict, options);
		res.json(result);
	});
	//To Show all districts
	app.get("/districts", async (req, res) => {
		const get = Districts.find({});
		alldistrict = await get.toArray();
		res.send(alldistrict);
	});
	//To load single district by id
	app.get("/district/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const result = await Districts.findOne(findId);
		res.send(result);
	});
	//To Delete district one by one
	app.delete("/district/:id", async (req, res) => {
		const id = req.params.id;
		const deleteId = { _id: ObjectId(id) };
		const result = await Districts.deleteOne(deleteId);
		res.send(result);
	});
};
