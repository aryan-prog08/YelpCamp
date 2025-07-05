const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = arr => arr[Math.floor(Math.random()*arr.length)]

seedDb = async () => {
    await Campground.deleteMany({})
    for (let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            author: '6867f381c9c185b5ab3596d9', 
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae asperiores labore perferendis vero nisi minus neque aperiam dignissimos similique hic doloremque recusandae, reprehenderit non ut unde aut. Nobis, deleniti est.',
            image: 'https://picsum.photos/300',
            price: Math.floor(Math.random() * 30) + 10
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close()
})