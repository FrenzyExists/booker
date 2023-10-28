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

exports.find = async (req, res) => {

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