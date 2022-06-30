import axios from 'axios';
import { ScheduleType } from '../models/Schedule';

const API_URI = import.meta.env.VITE_API_URI;

const fetchProfile = async (uuid: string) => {
    
    const { data } = await axios.get(
        `${API_URI}/v1/geolocate/${uuid}`
    );

  return data;
};

const fetchAppointment = async (uuid: string) => {
    
  const { data } = await axios.get(
      `${API_URI}/api/Schedule/Appointment/${uuid}`
  );

  return data;
};

const fetchAppointmentUpdate = async (dataInput: ScheduleType) => {
    
  const { data } = await axios.post(
      `${API_URI}/api/Schedule/Appointment/update`,
      dataInput
  );

  return data;
};

export {
  fetchProfile,
  fetchAppointment,
  fetchAppointmentUpdate
};
