const Room = require('../models/room.model');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const room = new Room({
        roomName: req.body.name,
        roomNumber: req.body.number,
        capacity: req.body.capacity,
        category: req.body.category
    });

    await Room.create(room, (err, _data) => {
        if (err) {
            if (err.kind == "missing_data") {
                res.status(400).send({
                    message: `Missing JSON object, cannot update user id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Room."
                });
            }
        } else {
            res.send(_data);
        }
    });
};

/**
 * Finds a Room
 * no params: finds first 15 rooms
 * param[id : number]: finds a room that matches id
 * param[name: string]: finds a room that matches the name
 * param[cat: string]: finds rooms by category
 * @param {*} req 
 * @param {*} res 
 */
exports.find = async (req, res) => {
    const id = parseInt(req.params.data, 10);
    let offset = 0;
    let limit = 16;
    let category = req.query.cat;
    if (req.query.limit && !isNaN(parseInt(req.query.limit))) {
        limit = parseInt(req.query.limit);
    }
    if (req.query.offset && !isNaN(parseInt(req.query.offset))) {
        offset = parseInt(req.query.offset);
    }

    if (isNaN(id)) {
        if (typeof req.params.data === 'undefined') {
            if (category) {
                await Room.getByCategory(limit, offset, category, (err, _data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                message: `No Room! Better start creating some poyo.`
                            });
                        } else {
                            res.status(500).send({
                                message: `Couldn't get any Room. Server is unavailable.`
                            });
                        }
                    } else res.send(_data);
                });
            } else {
                // Get all rooms
                await Room.getAll(limit, offset, (err, _data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                message: `No Room! Better start creating some poyo.`
                            });
                        } else {
                            res.status(500).send({
                                message: `Couldn't get any Room. Server is unavailable.`
                            });
                        }
                    } else res.send(_data);
                });
            }
        } else if (typeof req.params.data === 'string') {
            await Room.getByName(req.params.data, (err, _data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `No Room! Better start creating some poyo.`
                        });
                    } else {
                        res.status(500).send({
                            message: `Couldn't get any Room. Server is unavailable.`
                        });
                    }
                } else res.send(_data);
            });
        }
    } else {
        await Room.getById(id, (err, _data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No Room! Better start creating some poyo.`
                    });
                } else {
                    res.status(500).send({
                        message: `Couldn't get any Room. Server is unavailable.`
                    });
                }
            } else res.send(_data);
        });
    }
};

exports.update = async (req, res) => {

};

exports.findAllDaySchedule = async (req, res) => {

};

exports.findAvailableRooms = (req, res) => {

};

exports.delete = (req, res) => {

};

// Get most booked room (top 10)
exports.findMostBooked = async (req, res) => {

}

exports.count = async (req, res) => {

}

exports.findWhoAppointedToThisRoom = async (req, res) => {

};

exports.findAtTime = async (req, res) => {

};

exports.findAllRoomCategories = async (req, res) => {

};