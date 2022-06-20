import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

export interface IAppointmentPageProps {};

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_AUTH;

const AppointmentPage: React.FunctionComponent<IAppointmentPageProps> = (props) => {

    const [map, setMap] = React.useState<google.maps.Map>();
    // const { isLoaded, loadError } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: GOOGLE_API_KEY,
    //     libraries: ['places']
    // });

    const position = {
        lat: -15.828020052676033,
        lng: -48.09541940689087
    };

    const onMapLoad = (map: google.maps.Map) => {
        setMap(map);
     };

    return(
        <>
            <h1>Appointment</h1>

            <LoadScript
                googleMapsApiKey={GOOGLE_API_KEY}
                libraries={['places']}
                >
                <GoogleMap
                    mapContainerStyle={{
                        width:'400px',
                        height: '400px'
                    }}
                    center={position}
                    zoom={15}
                    options={{
                        fullscreenControl: false,
                        mapTypeControl: false,
                        streetViewControl: false
                    }}
                    onLoad={onMapLoad}
                >
                        <Marker
                            position={position}
                            // options={{
                            //     label: {
                            //             text: `Posição do imóvel`,
                            //             className: 'map-marker'
                            //         }
                            //     }}
                            // clickable={false}
                            icon={{
                                path:
                                "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
                                fillColor: "#0000ff",
                                fillOpacity: 1.0,
                                strokeWeight: 0,
                                scale: 1.25
                            }}
                            // draggable= {false}
                            // label={`Label de teste`}
                        />
                </GoogleMap>
            </LoadScript>
        </>
    );
};

export default AppointmentPage;
