import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosInstance } from '@/lib/axios';
import { Doctors, Employees, Hospital, Nurses } from '@/types';

interface hospitalStore {
    hospitals: Hospital[];
    doctors: Doctors[];
    currentfloor: string;
    currentHospital: Hospital | null;
    nurses: Nurses[];
    employees: Employees[];
    bookingComplete: boolean;
    error: null | string;
    isLoading: boolean;
    getHospitalDetails: (hospitalId: string) => Promise<void>;
    getAllHospitals: () => Promise<void>;
    setCurrentHospital: (hospital: Hospital) => void;
    setCurrentFloor: (floor: string) => void
    createBooking: (userId: string | undefined, isPm: boolean, selectedDay: string, selectedTime: number, equipment: "wheelchair" | "stretcher") => Promise<boolean>
}

export const useHospitalStore = create<hospitalStore>()(
    persist(
        (set, get) => ({
            hospitals: [],
            doctors: [],
            currentfloor: '',
            currentHospital: null,
            nurses: [],
            bookingComplete: false,
            employees: [],
            error: null,
            isLoading: false,
            getHospitalDetails: async (hospitalId) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axiosInstance.get(`/hospital/${hospitalId}`);
                    set({ currentHospital: response.data });
                } catch (error: any) {
                    set({ error: error.message });
                } finally {
                    set({ isLoading: false });
                }
            },
            getAllHospitals: async () => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axiosInstance.get('/hospital');
                    set({ hospitals: response.data });
                } catch (error: any) {
                    set({ error: error.message });
                } finally {
                    set({ isLoading: false });
                }
            },
            setCurrentHospital: (hospital) =>
                set({
                    currentHospital: hospital,
                    isLoading: false,
                }),


            setCurrentFloor: (floor) => {
                set({ currentfloor: floor, isLoading: false });
            },

            createBooking: async (userId, isPm, selectedDay, selectedTime, equipment) => {
                set({ isLoading: true, error: null, bookingComplete: false });
                try {
                    if (userId === undefined) {
                        console.log("User must be signed in to make this request.")
                        set({ error: "User must be signed in to make this request.", isLoading: false })
                    }
                    const currentHospital = get().currentHospital
                    const currentfloor = get().currentfloor
                    const response = await axiosInstance.post(`/hospital/${currentHospital?._id}/${equipment}/booking`, { userId, isPm, selectedDay, selectedTime, currentfloor, equipment })
                    if (response.data.success) {
                        set({ bookingComplete: true, isLoading: false })
                    }
                    return true;
                } catch (error: any) {
                    set({ error: error.message })
                    return false;
                } finally {
                    set({ isLoading: false });
                }
            }
        }),
        {
            name: 'hospital-store',
            partialize: (state) => ({
                hospitals: state.hospitals,
                doctors: state.doctors,
                currentfloor: state.currentfloor,
                currentHospital: state.currentHospital,
                nurses: state.nurses,
                employees: state.employees,
            }),
        }
    )
);
