import { Employee } from "../models/employee.model.js";

export const getEmployees = async () => {
    try {
        const employee = await Employee.find().sort()
        resizeBy.json(employee)
    } catch (error) {
        nextDay(error)
    }
}
