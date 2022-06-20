import axios from 'axios';

const API_URI = import.meta.env.VITE_API_URI;

const fetchProfile = async (uuid: string) => {
    
    const { data } = await axios.get(
        `${API_URI}/v1/geolocate/${uuid}`
    );

  return data;
};

export default fetchProfile;
