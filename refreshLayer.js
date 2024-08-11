import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

export const useFetchMarkers = () => {
  const [markers, setMarkers] = useState([]);

  const fetchMarkers = async () => {
    let { data, error } = await supabase
      .from("data_titik")
      .select("id, nama, geom");

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      const parsedMarkers = data
        .map((item) => {
          if (item.geom && item.geom.coordinates) {
            const [latitude, longitude] = item.geom.coordinates;
            return {
              id: item.id,
              name: item.nama,
              coordinates: {
                latitude,
                longitude,
              },
            };
          }
          return null;
        })
        .filter((marker) => marker !== null);
      setMarkers(parsedMarkers);
    }
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  return { markers, fetchMarkers }; // Return both markers and fetchMarkers
};
