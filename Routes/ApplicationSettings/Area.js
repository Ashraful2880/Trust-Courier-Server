module.exports = function (app, Area, ObjectId) {
	//To post new area
	app.post("/area", async (req, res) => {
		const newarea = req.body;
		const result = await Area.insertOne(newarea);
		res.json(result);
	});

	// To update single area data
	app.put("/area/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updatearea = {
			$set: {
				district: updatedReq.district,
				areaType: updatedReq.areaType,
				area: updatedReq.area,
			},
		};
		const result = await Area.updateOne(findId, updatearea, options);
		res.json(result);
	});
	// To update single area Status
	app.put("/areaStatus/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updatearea = {
			$set: {
				status: updatedReq.status,
			},
		};
		const result = await Area.updateOne(findId, updatearea, options);
		res.json(result);
	});
	//To Show all area
	app.get("/areas", async (req, res) => {
		const get = Area.find({});
		allarea = await get.toArray();
		res.send(allarea);
	});
	//To load single area by id
	app.get("/area/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const result = await Area.findOne(findId);
		res.send(result);
	});
	//To Delete area one by one
	app.delete("/area/:id", async (req, res) => {
		const id = req.params.id;
		const deleteId = { _id: ObjectId(id) };
		const result = await Area.deleteOne(deleteId);
		res.send(result);
	});
};
