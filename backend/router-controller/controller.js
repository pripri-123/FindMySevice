import mongoose from 'mongoose'; 
import Job from '../models/jobs_model.js'; 
import { check, validationResult } from 'express-validator'; 

// Fetch jobs as per specifications provided in request body
export const getJobs = async (req, res) => {																	
    try {
        const jobs = await Job.find({
            location: req.body.location, 
            type_of_work: req.body.type_of_work, 
            field: req.body.field
        });

        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching jobs", error: err.message });
    }
};  	 

// Add a new applicant to a job
export const putUser = async (req, res) => {	
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ message: "Name, email, and phone are required" });
    }

    try {
        // Find ANY job listing that is open
        const job = await Job.findOneAndUpdate(
            { applicants: { $not: { $elemMatch: { email } } } },  // Ensures no duplicate applications
            { $push: { applicants: { name, email, phone } } },
            { new: true }
        );

        if (!job) {
            return res.status(404).json({ message: "No job found or user already applied" });
        }

        res.status(201).json({ message: "User added successfully", job });
    } catch (err) {
        res.status(500).json({ message: "Error updating database", error: err.message });
    }
};
