import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

export interface IMapPagesProps {};

const MapPages: React.FunctionComponent<IMapPagesProps> = (props) => {

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_AUTH;

    const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: GOOGLE_API_KEY
        });
    const position = {
        lat: -27.590824,
        lng: -48.551262
      };

    // const googleKey = process.env.GOOGLE_MAPS_API;
    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={{width:'400px', height: '400px'}}
          center={position}
          zoom={15}
        >
          <Marker position={position} options={{label: {text: 'Posição do imóvel', className: 'map-marker'}}} />
        </GoogleMap>
    ) : <>vrau</>
};

export default MapPages;
