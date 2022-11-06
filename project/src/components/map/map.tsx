import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import { Offers } from '../../types/offers';
import { Points } from '../../types/map'; //Point
import { Icon, Marker } from 'leaflet';
import { City } from '../../types/cities';

type MapProps = {
  offers: Offers;
  city: City;
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
  const { offers, city } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const points: Points = [];
  offers.map((offer) => points.push(offer.location));

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
  }, [map, city, points]);

  return <section className="cities__map map" ref={mapRef} />;
}

export default Map;
