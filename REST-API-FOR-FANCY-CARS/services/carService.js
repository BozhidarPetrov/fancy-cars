const Car = require('../models/Car');
const User = require('../models/User');



async function getAll() {
    return Car.find({});
}

async function create(car) {
    const result = new Car(car);

    await result.save();

    return result;
}

function getById(id) {
    return Car.findById(id).lean()
    .populate('likes')

}

async function update(id, car) {
    const existing = await Car.findById(id);

    existing.brand = car.brand;
    existing.model = car.model;
    existing.engine = car.engine;
    existing.horsepower = car.horsepower;
    existing.fuel = car.fuel;
    existing.color = car.color;
    existing.year = car.year;
    existing.image = car.image;
    

    await existing.save();

    return existing;
}

async function deleteById(carId) {
    const car = await Car.findById(carId);
    
    const user = await User.findById(car.ownerId);
let index = user.ownerOf.indexOf(carId);
user.ownerOf.splice(index, 1);
await user.save();


await Car.findByIdAndDelete(carId);

}


async function like(carId, userId){
    const car = await Car.findById(carId);
    
    if (car.likes.includes(userId)) {
        throw new Error('You have already liked that car!')
    }
    car.likes.push(userId);

    await car.save();
    

}

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById,
    like
};