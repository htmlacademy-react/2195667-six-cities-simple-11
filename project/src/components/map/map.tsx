import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import { Offers } from '../../types/offers';
import { Icon, Marker } from 'leaflet';
import { City } from '../../types/cities';

type MapProps = {
  offers: Offers;
  city: City;
  mapClass?: string;
  // points: Points
  // selectedPoint: Point | undefined
}

const defaultCustomIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

// const currentCustomIcon = new Icon({
//   iconUrl: '/img/pin-active.svg',
//   iconSize: [28, 40],
//   iconAnchor: [14, 40]
// });

function Map(props: MapProps): JSX.Element {
  const { offers, city, mapClass } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker.setIcon(defaultCustomIcon).addTo(map);
      });
    }
  }, [map, city, offers]);

  return <section className={`map ${mapClass || ''}`} ref={mapRef} />;
}

export default Map;
