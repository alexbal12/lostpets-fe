import { positionPet } from "hooks";
import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { geoBusqueda } from "./api";
import css from "./index.css";
//me logueo a mapbox con el token
mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

export function Mapbox({ lat, lng }) {
  const mapContainer = useRef(null);
  const infoContainer = useRef(null);
  const map = useRef(null);
  const [placeName, setPlaceName] = useState("");
  const { setLngLat } = positionPet();
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 10,
      attributionControl: false,
    });
    map.current.on("mousemove", (e) => {
      infoContainer.current.innerHTML = JSON.stringify(
        "lat:" + e.lngLat.lat + ",long:" + e.lngLat.lng
      );
    });
    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat({ lng, lat })
      .addTo(map.current);
    async function onDragEnd() {
      const lngLat = marker.getLngLat();
      setLngLat(lngLat);
      const place = await geoBusqueda(lngLat.lng, lngLat.lat);
      setPlaceName(place);
    }

    marker.on("dragend", onDragEnd);
  }, [mapContainer]);

  return (
    <div>
      <pre className={css.info} ref={infoContainer}></pre>
      <div ref={mapContainer} style={{ width: "100%", height: "350px" }}></div>
      <span className={css.span}>{placeName} </span>
    </div>
  );
}
