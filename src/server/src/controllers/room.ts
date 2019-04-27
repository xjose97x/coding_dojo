import { Request, Response, NextFunction } from "express";
import Room, { RoomModel } from "../models/Room";
import User from "../models/User";

export let postRoom = async (req: Request, res: Response, next: NextFunction) => {
    req.assert("name", "Room name is required").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    const emails: string[] = req.body.emails;
    const users = await User.find({ email: { "$in": emails } });
    if (users.length < emails.length) {
        return res.status(400).send("An email is invalid");
    }

    let room = new Room({
        creator: (req as any).payload._id,
        name: req.body.name,
        members: users.map(u => u.id)
    });

    try {
        room = await room.save();
        return res.status(201).send(room);
    } catch (err) {
        return next(err);
    }
};

export let getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
    const rooms = await Room.find().populate("creator", "email").populate("members", "email");
    if (!rooms) {
        return res.status(404);
    }
    return res.status(200).send(rooms);
};

export let getRoomByID = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const room = await Room.findById(id).populate("creator").populate("members");
    if (!room) {
        return res.status(404);
    }
    return res.status(200).send(room);
};

export let inviteMembers = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const emails: string[] = req.body.emails;
    const users = await User.find({ email: { "$in": emails } });
    if (users.length < emails.length) {
        return res.status(400).send("An email is invalid");
    }
    let room: RoomModel;
    try {
        room = (await Room.findById(id)) as RoomModel;
    } catch (err) {
        return next(err);
    }
    room.members = room.members.concat(users.map(u => u.id));
    try {
        room = await room.save();
        return res.status(200).send(room);
    } catch (err) {
        return next(err);
    }
}
