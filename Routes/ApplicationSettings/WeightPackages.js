module.exports = function (app, WeightPackages, ObjectId) {
	//To post new weightPackage
	app.post("/weightPackage", async (req, res) => {
		const newweightPackage = req.body;
		const result = await WeightPackages.insertOne(newweightPackage);
		res.json(result);
	});

	// To update single weightPackage data
	app.put("/weightPackage/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updateweightPackage = {
			$set: {
				weightPackageId: updatedReq.weightPackageId,
				weightPackageName: updatedReq.weightPackageName,
				weightPackageTitle: updatedReq.weightPackageTitle,
				weightPackageType: updatedReq.weightPackageType,
				weightPackageDescription: updatedReq.weightPackageDescription,
				weightPackageRate: updatedReq.weightPackageRate,
			},
		};
		const result = await WeightPackages.updateOne(
			findId,
			updateweightPackage,
			options,
		);
		res.json(result);
	});
	// To update single weightPackage Status
	app.put("/weightPackageStatus/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updateweightPackage = {
			$set: {
				status: updatedReq.status,
			},
		};
		const result = await WeightPackages.updateOne(
			findId,
			updateweightPackage,
			options,
		);
		res.json(result);
	});
	//To Show all weightPackages
	app.get("/weightPackages", async (req, res) => {
		const get = WeightPackages.find({});
		allweightPackages = await get.toArray();
		res.send(allweightPackages);
	});
	//To load single weightPackage by id
	app.get("/weightPackage/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const result = await WeightPackages.findOne(findId);
		res.send(result);
	});
	//To Delete weightPackage one by one
	app.delete("/weightPackage/:id", async (req, res) => {
		const id = req.params.id;
		const deleteId = { _id: ObjectId(id) };
		const result = await WeightPackages.deleteOne(deleteId);
		res.send(result);
	});
};
