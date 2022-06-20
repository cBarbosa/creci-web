import axios from 'axios';

const fetchIPGeoLocation = async () => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_AUTH;
    
    const { data } = await axios.post(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`
    );

  return data.location;
};

export default fetchIPGeoLocation;
