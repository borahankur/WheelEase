import { Routes, Route } from "react-router-dom"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import { Toaster } from 'react-hot-toast'
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage"
import HomePage from "./pages/home/HomePage"
import SelectorPage from "./pages/selector/SelectorPage"
import EmergencyPage from "./pages/emergency/EmergencyPage"
import LoginPage from "./pages/login/LoginPage"
import SignupPage from "./pages/signup/SignupPage"
import UserPage from "./pages/user/UserPage"
import EmployeePage from "./pages/employee/EmployeePage"
import DoctorPage from "./pages/doctor/DoctorPage"
import NursePage from "./pages/nurse/NursePage"
import AmbulancePage from "./pages/ambulance/AmbulancePage"
import HospitalPage from "./pages/hospital/HospitalPage"
import WheelChairPage from "./pages/hospital/WheelChairPage"
import WheelChairBooking from "./pages/hospital/WheelChairBooking"
import StretcherPage from "./pages/hospital/StretcherPage"
import StretcherBooking from "./pages/hospital/StretcherBooking"
import ConfirmationPage from "./pages/hospital/ConfirmationPage"
import EmployeeWelPage from "./pages/employee/EmployeeWelPage"
import DoctorWelPage from "./pages/doctor/DoctorWelPage"
import NurseWelPage from "./pages/nurse/NurseWelPage"
import ChatbotPage from "./pages/chatbot/ChatbotPage"
import ErrorPage from "./pages/404/ErrorPage"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={'/auth-callback'} />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path='/options' element={<SelectorPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/employeePage" element={<EmployeeWelPage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/doctorPage" element={<DoctorWelPage />} />
        <Route path="/nurse" element={<NursePage />} />
        <Route path="/nursePage" element={<NurseWelPage />} />
        <Route path="/ambulance" element={<AmbulancePage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/hospital/:hospitalId" element={<HospitalPage />} />

        <Route path="/hospital/:hospitalId/wheelchair" element={<WheelChairPage />} />
        <Route path="/hospital/:hospitalId/wheelchair/booking" element={<WheelChairBooking />} />
        <Route path="/hospital/:hospitalId/wheelchair/booking/confirm" element={<ConfirmationPage />} />

        <Route path="/hospital/:hospitalId/stretcher" element={<StretcherPage />} />
        <Route path="/hospital/:hospitalId/stretcher/booking" element={<StretcherBooking />} />
        <Route path="/hospital/:hospitalId/stretcher/booking/confirm" element={<ConfirmationPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
