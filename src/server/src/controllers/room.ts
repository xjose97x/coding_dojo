import { Request, Response, NextFunction } from "express";
import Room from "../models/Room";

/**
 * POST /login
 * Create room
 */
export let postRoom = (req: Request, res: Response, next: NextFunction) => {
  req.assert("name", "Room name is required").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }
  const room = new Room({
    creator: (req as any).payload._id,
    name: req.body.name
  });
  room.save((err: any) => {
    if (err) { return next(err); }

    return res.status(200);
  });
};

export let getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
    const rooms = await Room.find().populate("creator").populate("members");
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
