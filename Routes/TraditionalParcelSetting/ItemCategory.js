module.exports = function (app, ItemCategory, ObjectId) {
	//To post new itemCategory
	app.post("/itemCategory", async (req, res) => {
		const newitemCategory = req.body;
		const result = await ItemCategory.insertOne(newitemCategory);
		res.json(result);
	});

	// To update single itemCategory data
	app.put("/itemCategory/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updateitemCategory = {
			$set: {
				itemCategoryName: updatedReq.itemCategoryName,
				itemCategoryDetails: updatedReq.itemCategoryDetails,
			},
		};
		const result = await ItemCategory.updateOne(
			findId,
			updateitemCategory,
			options,
		);
		res.json(result);
	});
	// To update single itemCategory Status
	app.put("/itemCategoryStatus/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updateitemCategory = {
			$set: {
				status: updatedReq.status,
			},
		};
		const result = await ItemCategory.updateOne(
			findId,
			updateitemCategory,
			options,
		);
		res.json(result);
	});
	//To Show all itemCategory
	app.get("/itemCategories", async (req, res) => {
		const get = ItemCategory.find({});
		allitemCategories = await get.toArray();
		res.send(allitemCategories);
	});
	//To load single itemCategory by id
	app.get("/itemCategory/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const result = await ItemCategory.findOne(findId);
		res.send(result);
	});
	//To Delete itemCategory one by one
	app.delete("/itemCategory/:id", async (req, res) => {
		const id = req.params.id;
		const deleteId = { _id: ObjectId(id) };
		const result = await ItemCategory.deleteOne(deleteId);
		res.send(result);
	});
};
