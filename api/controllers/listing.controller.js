import Listing from "../models/listing.modle.js";


export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        res.status(201).json({ message: "Listing created successfully", listing });
    } catch (error) {
        next(error);        
    }
};