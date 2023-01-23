module.exports = function (app, AllUsers, ObjectId) {
	//To post new user
	app.post("/user", async (req, res) => {
		const newuser = req.body;
		const result = await AllUsers.insertOne(newuser);
		res.json(result);
	});
	// To update single user Status
	app.put("/userStatus/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const updatedReq = req.body;
		const options = { upsert: true };
		const updateuser = {
			$set: {
				status: updatedReq.status,
			},
		};
		const result = await AllUsers.updateOne(findId, updateuser, options);
		res.json(result);
	});
	//To Show all users
	app.get("/users", async (req, res) => {
		const get = AllUsers.find({});
		const allusers = await get.toArray();
		res.send(allusers);
	});
	//To load single user by id
	app.get("/user/:id", async (req, res) => {
		const id = req.params.id;
		const findId = { _id: ObjectId(id) };
		const result = await AllUsers.findOne(findId);
		res.send(result);
	});
	//To load single user by email
	app.get("/userByEmail/:email", async (req, res) => {
		const emailIn = req.params.email;
		const findId = { email: emailIn };
		const result = await AllUsers.findOne(findId);
		res.send(result || "N/A");
	});
	//To Delete user one by one
	app.delete("/user/:id", async (req, res) => {
		const id = req.params.id;
		const deleteId = { _id: ObjectId(id) };
		const result = await AllUsers.deleteOne(deleteId);
		res.send(result);
	});
};
