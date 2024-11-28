import {Nurse} from '../models/nurse.model.js'

export const getNurses = async(req, res, next) => {
    try {
        const nurses = Nurse.find().sort()
        res.json(nurses)
    } catch (error) {
        next(error)
    }
}


