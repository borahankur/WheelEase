export interface User {
    _id: string
    fullName: string
    imageUrl: string
    clerkId: string
}

export interface Doctors {
    _id: string
    fullname: string
    imageUrl: string
    hospitalId: string | null
}

export interface Nurses {
    _id: string
    fullname: string
    hospitalId: string | null
}

export interface Employees {
    _id: string
    fullname: string
    hospitalId: string | null
}

export interface Booking {
    _id: string
    hospital: string
    user: string
    floor: string
    equipment: string
    time: string
    day: string
    startDate: Date
    endDate: Date
    status: 'booked' | 'in-progress' | 'completed'
}

export interface Hospital {
    _id: string
    fullname: string
    floors: number
    guidingMaps: string[]
    doctors: Doctors[]
    nurses: Nurses[]
    employees: Employees[]
    imageUrl: string
    floorEquipment: [{
        floorNumber: string,
        wheelchairs: number,
        stretchers: number
    }]
    bookings: Booking[]
}
