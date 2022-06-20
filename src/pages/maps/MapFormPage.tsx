import {
    GoogleMap,
    LoadScript,
    Marker,
    StandaloneSearchBox
} from '@react-google-maps/api';
import React from 'react';
import fetchIPGeoLocation from '../../services/fetchIPGeoLocation';
import { useQuery } from 'react-query';

export interface IMapFormPagesProps {};

const MapFormPages: React.FunctionComponent<IMapFormPagesProps> = (props) => {

    const [map, setMap] = React.useState<google.maps.Map>();
    const [searchBox, setSearchBox] = React.useState<google.maps.places.SearchBox>();
    const [markers, setMarkers] = React.useState<google.maps.LatLngLiteral[]>([]);
    const [clickedLatLng, setClickedLatLng] = React.useState<google.maps.LatLngLiteral | null>(null);

    const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_AUTH;

    const { data: geoIPLatLng, status: geoIPLatLngStatus } = useQuery(
        'userGeoIPData',
        fetchIPGeoLocation
    );

    // const position = {
    //     lat: -27.590824,
    //     lng: -48.551262
    // };

    const onMapLoad = (map: google.maps.Map) => {
        setMap(map);
     };

    const onLoad = (ref: google.maps.places.SearchBox) => {
       setSearchBox(ref);
    };

    const onPlacesChanged = () => {
        const places = searchBox!.getPlaces();

        console.debug('onPlacesChanged', places);

        const place = places![0];
        
        const location = {
            lat: place?.geometry?.location?.lat() || 0,
            lng: place?.geometry?.location?.lng() || 0
        } as google.maps.LatLngLiteral;

        setMarkers([...markers, location]);
        console.debug('location', location);
        map?.panTo(location);
    };

    React.useEffect(() => {
        if (
          geoIPLatLngStatus === "success"
        ) {
          console.debug('geoIPLatLng', geoIPLatLng);
          map?.panTo(geoIPLatLng);
        }
      }, [geoIPLatLngStatus, geoIPLatLng, map]);

    
    // const googleKey = process.env.GOOGLE_MAPS_API;
    return (
        <div style={{
            display: "flex",
            height: "calc(100vh - 50px)"
        }}
        >
            <LoadScript
                googleMapsApiKey={GOOGLE_API_KEY}
                libraries={['places']}
                >
                    <GoogleMap
                        mapContainerStyle={{width:'100%', height:'100%'}}
                        onLoad={onMapLoad}
                        center={geoIPLatLng}
                        zoom={15}
                        // onClick={e => {setClickedLatLng(e.latLng?.toJSON() as google.maps.LatLngLiteral);map?.panTo(e.latLng?.toJSON() as google.maps.LatLngLiteral)}}
                        onClick={e => setClickedLatLng(e.latLng?.toJSON() as google.maps.LatLngLiteral)}
                    >
                        <StandaloneSearchBox
                            onLoad={onLoad}
                            onPlacesChanged={onPlacesChanged}
                        >
                            <input
                                className='address'
                                placeholder='endereço'
                                style={{
                                    boxSizing: `border-box`,
                                    border: `1px solid transparent`,
                                    width: `240px`,
                                    height: `32px`,
                                    padding: `0 12px`,
                                    borderRadius: `3px`,
                                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                    fontSize: `14px`,
                                    outline: `none`,
                                    textOverflow: `ellipses`,
                                    position: "absolute",
                                    left: "50%",
                                    marginLeft: "-120px"
                                  }}
                            />
                        </StandaloneSearchBox>
                        {/* <Marker
                            position={position}
                            options={{
                                label: {
                                    text: 'Posição do imóvel',
                                    className: 'map-marker'
                                }
                            }}
                        /> */}
                        {markers.map((marker, index) => (
                            <Marker
                                key={index}
                                position={marker}
                                // icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
                                // onClick={event => markerClickHandler(event, marker)}
                                icon={{
                                    path:
                                      "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
                                    fillColor: "#0000ff",
                                    fillOpacity: 1.0,
                                    strokeWeight: 0,
                                    scale: 1.25
                                  }}
                            />
                        ))}

                        <button
                            className='border-2'
                            style={{
                                position: `absolute`,
                                bottom: 8,
                                right: 8
                            }}
                            onClick={() => {
                            console.log("center = ", map?.getCenter()?.toJSON());
                            }}
                        >
                            Log center
                        </button>
                    </GoogleMap>
            </LoadScript>

            {clickedLatLng && (
            <h3>
                You clicked: {clickedLatLng.lat}, {clickedLatLng.lng}
            </h3>
            )}
        </div>
    );
};

export default MapFormPages;
