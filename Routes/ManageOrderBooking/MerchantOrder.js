module.exports = function (app, MerchantOrder, ObjectId) {
	//To post new merchantorder
	app.post("/merchantorder", async (req, res) => {
		const newmerchantorder = req.body.data;
		const result = await MerchantOrder.insertOne(newmerchantorder);
		res.json(result);
	});

	// To update single merchantorder Status
	app.put("/merchantorderStatus/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updatemerchantorder = {
			$set: {
				status: updatedReq.status,
				statusUpdateTime: updatedReq?.time,
			},
		};
		const result = await MerchantOrder.updateOne(
			findId,
			updatemerchantorder,
			options,
		);
		res.json(result);
	});

	// To update single merchantorder Status
	app.put("/merchantorderPaymentCollection/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updatemerchantorder = {
			$set: {
				paymentCollectionDetails: updatedReq,
			},
		};
		const result = await MerchantOrder.updateOne(
			findId,
			updatemerchantorder,
			options,
		);
		res.json(result);
	});

	// To update single merchantorder merchant rec Status
	app.put("/merchantorderPaymentRecMerchant/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const collectionStatus = req.body.collectionStatus;
		const merchantMoneyStatus = req.body.merchantMoneyStatus;
		const moneyReceivedInMerchantDate = req.body.moneyReceivedInMerchantDate;
		const find = await MerchantOrder.findOne(findId);
		const options = { upsert: true };
		const updatemerchantorder = {
			$set: {
				paymentCollectionDetails: {
					...find?.paymentCollectionDetails,
					collectionStatus,
					merchantMoneyStatus,
					moneyReceivedInMerchantDate,
				},
			},
		};
		const result = await MerchantOrder.updateOne(
			findId,
			updatemerchantorder,
			options,
		);
		res.json(result);
	});

	// To update single merchantorder merchant pay return fee Status
	app.put("/merchantorderPaymentReturnFee/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const collectionStatus = req.body.collectionStatus;
		const merchantReturnFeeStatus = req.body.merchantReturnFeeStatus;
		const ReturnFeePaidDate = req.body.ReturnFeePaidDate;
		const find = await MerchantOrder.findOne(findId);
		const options = { upsert: true };
		const updatemerchantorder = {
			$set: {
				paymentCollectionDetails: {
					...find?.paymentCollectionDetails,
					collectionStatus,
					merchantReturnFeeStatus,
					ReturnFeePaidDate,
				},
			},
		};
		const result = await MerchantOrder.updateOne(
			findId,
			updatemerchantorder,
			options,
		);
		res.json(result);
	});

	// To update single merchantorder branch rec Status
	app.put("/merchantorderPaymentRecBranch/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const collectionStatus = req.body.collectionStatus;
		const moneyReceivedInBranchDate = req.body.moneyReceivedInBranchDate;
		const branchMoneyStatus = req.body.branchMoneyStatus;
		const find = await MerchantOrder.findOne(findId);
		const options = { upsert: true };
		const updatemerchantorder = {
			$set: {
				paymentCollectionDetails: {
					...find?.paymentCollectionDetails,
					collectionStatus,
					moneyReceivedInBranchDate,
					branchMoneyStatus,
				},
			},
		};
		const result = await MerchantOrder.updateOne(
			findId,
			updatemerchantorder,
			options,
		);
		res.json(result);
	});
	// To update single merchantorder branch send Status
	app.put("/merchantorderPaymentsend/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const collectionStatus = req.body.collectionStatus;
		const find = await MerchantOrder.findOne(findId);
		const options = { upsert: true };
		const updatemerchantorder = {
			$set: {
				paymentCollectionDetails: {
					...find?.paymentCollectionDetails,
					collectionStatus,
				},
			},
		};
		const result = await MerchantOrder.updateOne(
			findId,
			updatemerchantorder,
			options,
		);
		res.json(result);
	});
	// To update single merchantorder acc rec Status
	app.put("/merchantorderPaymentaccRec/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const collectionStatus = req.body.collectionStatus;
		const accountsMoneyStatus = req.body.accountsMoneyStatus;
		const moneyReceivedInAccountsDate = req.body.moneyReceivedInAccountsDate;
		const find = await MerchantOrder.findOne(findId);
		const options = { upsert: true };
		const updatemerchantorder = {
			$set: {
				paymentCollectionDetails: {
					...find?.paymentCollectionDetails,
					collectionStatus,
					accountsMoneyStatus,
					moneyReceivedInAccountsDate,
				},
			},
		};
		const result = await MerchantOrder.updateOne(
			findId,
			updatemerchantorder,
			options,
		);
		res.json(result);
	});

	// To update single merchantorder (to branch) rider
	app.put("/merchantorderRiderCollect/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updatemerchantorder = {
			$set: {
				collectRiderInfo: updatedReq.collectRiderInfo,
				status: updatedReq.status,
				statusUpdateTime: updatedReq?.time,
			},
		};
		const result = await MerchantOrder.updateOne(
			findId,
			updatemerchantorder,
			options,
		);
		res.json(result);
	});
	// To update single merchantorder (to customer) rider
	app.put("/merchantorderRiderDeviler/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updatemerchantorder = {
			$set: {
				deliverRiderInfo: updatedReq.deliverRiderInfo,
				status: updatedReq.status,
				statusUpdateTime: updatedReq?.time,
			},
		};
		const result = await MerchantOrder.updateOne(
			findId,
			updatemerchantorder,
			options,
		);
		res.json(result);
	});
	// To update single merchantorder warehouse
	app.put("/merchantorderWarehouse/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		console.log(updatedReq.warehouseInfo);
		const updatemerchantorder = {
			$set: {
				warehouseInfo: updatedReq.warehouseInfo,
				status: updatedReq.status,
				statusUpdateTime: updatedReq?.time,
			},
		};
		const result = await MerchantOrder.updateOne(
			findId,
			updatemerchantorder,
			options,
		);
		res.json(result);
	});
	// To update single merchantorder returned warehouse
	app.put("/merchantorderReturnWarehouse/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		console.log(updatedReq.warehouseInfo);
		const updatemerchantorder = {
			$set: {
				returnWarehouseInfo: updatedReq.warehouseInfo,
				status: updatedReq.status,
				statusUpdateTime: updatedReq?.time,
			},
		};
		const result = await MerchantOrder.updateOne(
			findId,
			updatemerchantorder,
			options,
		);
		res.json(result);
	});

	//To Show all merchantorders
	app.get("/merchantorders", async (req, res) => {
		const get = MerchantOrder.find({});
		allmerchantorders = await get.toArray();
		res.send(allmerchantorders);
	});

	//To Show all branchOrders
	app.get("/merchantordersbyemail/:email", async (req, res) => {
		const email = req.params.email;
		const get = MerchantOrder.find({});
		allmerchantorders = await get.toArray();
		const filter = allmerchantorders.filter(
			(order) => order?.marchentInfo?.merchantEmail === email,
		);
		res.send(filter);
	});
	//To Show all branchOrders
	app.get("/senderBranchOrders/:branchName", async (req, res) => {
		const branchName = req.params.branchName;
		const get = MerchantOrder.find({});
		allmerchantorders = await get.toArray();
		const filter = allmerchantorders.filter(
			(order) => order?.senderBranchInfo?.branchName === branchName,
		);
		res.send(filter);
	});
	//To Show all riderOrders
	app.get("/riderCollectOrders/:email", async (req, res) => {
		const email = req.params.email;
		const get = MerchantOrder.find({});
		allmerchantorders = await get.toArray();
		const filter = allmerchantorders.filter(
			(order) => order?.collectRiderInfo?.riderEmail === email,
		);
		res.send(filter);
	});
	//To Show all riderOrders
	app.get("/riderDeliverOrders/:email", async (req, res) => {
		const email = req.params.email;
		const get = MerchantOrder.find({});
		allmerchantorders = await get.toArray();
		const filter = allmerchantorders.filter(
			(order) => order?.deliverRiderInfo?.riderEmail === email,
		);
		res.send(filter);
	});
	//To Show all riderOrders
	app.get("/riderOrders/:email", async (req, res) => {
		const email = req.params.email;
		const get = MerchantOrder.find({});
		allmerchantorders = await get.toArray();
		const filter = allmerchantorders.filter(
			(order) =>
				order?.deliverRiderInfo?.riderEmail === email ||
				order?.collectRiderInfo?.riderEmail === email,
		);
		res.send(filter);
	});
	//To Show all warehouseOrders
	app.get("/warehouseOrders/:email", async (req, res) => {
		const email = req.params.email;
		const get = MerchantOrder.find({});
		allmerchantorders = await get.toArray();
		const filter = allmerchantorders.filter(
			(order) => order?.warehouseInfo?.warehouseUserEmail === email,
		);
		res.send(filter);
	});

	////////????????////////////
	//To Show all receiverBranchOrders
	app.get("/receiverBranchOrders/:branchName", async (req, res) => {
		const branchName = req.params.branchName;
		const get = MerchantOrder.find({});
		allmerchantorders = await get.toArray();
		const filter = allmerchantorders.filter(
			(order) => order?.receiverInfo?.receiverBranchName === branchName,
		);
		res.send(filter);
	});
	////////????????////////////

	//To load single merchantorder by order id
	app.get("/merchantordersbyOrderId/:orderId", async (req, res) => {
		const id = req.params.orderId;
		const findId = { orderId: id };
		const result = await MerchantOrder.findOne(findId);
		res.send(result || "N/A");
	});
	//To load single merchantorder by id
	app.get("/merchantorder/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const result = await MerchantOrder.findOne(findId);
		res.send(result);
	});
	//To Delete merchantorder one by one
	app.delete("/merchantorder/:id", async (req, res) => {
		const id = req.params.id;
		const deleteId = { _id: ObjectId(id) };
		const result = await MerchantOrder.deleteOne(deleteId);
		res.send(result);
	});
};
