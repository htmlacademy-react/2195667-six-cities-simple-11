import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import { Offers } from '../../types/offers';
import { Icon, Marker } from 'leaflet';
import { City } from '../../types/cities';
import { MapMarker } from '../../const';
import { Point } from '../../types/map';

type MapProps = {
  offers: Offers;
  city: City;
  mapClass?: string;
  selectedPoint: Point | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: MapMarker.Default,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: MapMarker.Current,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

function Map(props: MapProps): JSX.Element {
  const { offers, city, mapClass, selectedPoint } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];
    if (map) {
      offers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined &&
              point.location.latitude === selectedPoint.latitude &&
              point.location.longitude === selectedPoint.longitude
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);

        markers.push(marker);
      });
    }

    return () => {
      if (map) {
        markers.forEach((marker) => {
          marker.removeFrom(map);
        });
      }
    };
  }, [map, city, offers, selectedPoint]);

  useEffect(() => {
    if (map) {
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }
  }, [map, city]);

  return <section className={`map ${mapClass || ''}`} ref={mapRef} />;
}

export default Map;
