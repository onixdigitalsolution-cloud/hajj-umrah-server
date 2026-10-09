import mongoose from "mongoose";
import dotenv from "dotenv";
import Package from "./models/Package.js";

dotenv.config();

// NOTE: prices and nights are DEMO values. You will change them later from the admin dashboard.
const packages = [
    {
        "slug": "hajj-economy",
        "type": "hajj",
        "label": "Economy",
        "title": "Economy Hajj Package",
        "description": "A comfortable and affordable Hajj package with essential travel services.",
        "image": "pkg1.png",
        "featured": false,
        "features": [
            "Accommodation",
            "Transportation",
            "Hajj Guidance",
            "Travel Assistance"
        ],
        "duration": "15 Days",
        "makkahNights": "8 Nights",
        "madinahNights": "5 Nights",
        "price": "LKR 350,000"
    },
    {
        "slug": "hajj-standard",
        "type": "hajj",
        "label": "Popular",
        "title": "Standard Hajj Package",
        "description": "A balanced package designed for a comfortable and organized journey.",
        "image": "pkg2.png",
        "featured": true,
        "features": [
            "Hotel Accommodation",
            "Transportation",
            "Hajj Guidance",
            "Dedicated Support"
        ],
        "duration": "15 Days",
        "makkahNights": "8 Nights",
        "madinahNights": "5 Nights",
        "price": "LKR 400,000"
    },
    {
        "slug": "hajj-premium",
        "type": "hajj",
        "label": "Premium",
        "title": "Premium Hajj Package",
        "description": "Enhanced accommodation and services for a more comfortable experience.",
        "image": "pkg3.png",
        "featured": false,
        "features": [
            "Premium Accommodation",
            "Transportation",
            "Hajj Guidance",
            "Personal Assistance"
        ],
        "duration": "15 Days",
        "makkahNights": "8 Nights",
        "madinahNights": "5 Nights",
        "price": "LKR 450,000"
    },
    {
        "slug": "umrah-10-days",
        "type": "umrah",
        "label": "10 Days",
        "title": "10 Days Umrah Package",
        "description": "A short and convenient Umrah journey covering Makkah and Madinah.",
        "image": "pkg4.png",
        "featured": false,
        "features": [
            "Makkah Accommodation",
            "Madinah Accommodation",
            "Transportation",
            "Umrah Guidance"
        ],
        "duration": "10 Days",
        "makkahNights": "6 Nights",
        "madinahNights": "4 Nights",
        "price": "LKR 350,000"
    },
    {
        "slug": "umrah-15-days",
        "type": "umrah",
        "label": "15 Days",
        "title": "15 Days Umrah Package",
        "description": "Enjoy more time for worship and a peaceful stay in the holy cities.",
        "image": "pkg2.png",
        "featured": true,
        "features": [
            "Makkah Accommodation",
            "Madinah Accommodation",
            "Transportation",
            "Travel Support"
        ],
        "duration": "15 Days",
        "makkahNights": "8 Nights",
        "madinahNights": "5 Nights",
        "price": "LKR 450,000"
    },
    {
        "slug": "umrah-21-days",
        "type": "umrah",
        "label": "21 Days",
        "title": "21 Days Umrah Package",
        "description": "An extended spiritual journey with comfortable accommodation and support.",
        "image": "pkg3.png",
        "featured": false,
        "features": [
            "Hotel Accommodation",
            "Transportation",
            "Umrah Guidance",
            "Dedicated Support"
        ],
        "duration": "21 Days",
        "makkahNights": "12 Nights",
        "madinahNights": "7 Nights",
        "price": "LKR 600,000"
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        await Package.deleteMany({});          // remove old packages
        await Package.insertMany(packages);    // add the 6 packages

        console.log("Done! " + packages.length + " packages added.");
    } catch (error) {
        console.log("Seed error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
