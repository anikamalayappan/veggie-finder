import express from 'express';
const router = express.Router();
import 'dotenv/config';
import fetch from 'node-fetch';

router.post('/getList', async (req, res) => {
    console.log("here");
    console.log(req.body);
    const apiKey = process.env.API_KEY;
    const { lat, lng } = req.body;
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.websiteUri,places.rating,places.photos'
        },
        body: JSON.stringify({
            textQuery: 'vegetarian restaurants',
            locationBias: {
                circle: {
                    center: {
                        latitude: lat,
                        longitude: lng
                    },
                    radius: 500.0
                }
            }
        })
    });
    const data = await response.json();
    const places = data.places;
    console.log(places);
    res.json(places);

})

export default router;

