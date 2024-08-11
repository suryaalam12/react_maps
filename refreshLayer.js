import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { insertRecord } from "./koneksi";

export const useFetchMarkers = () => {
  const [markers, setMarkers] = useState([]);

  const fetchMarkers = async () => {
    try {
      let { data, error } = await supabase
        .from("data_titik")
        .select("id, nama, geom");

      if (error) {
        console.error("Error fetching data:", error);
        return; // Exit early if there was an error
      }

      console.log("Fetched data:", data); // Log fetched data for debugging
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
    } catch (err) {
      console.error("Unhandled error in fetchMarkers:", err);
    }
  };
  useEffect(() => {
    fetchMarkers();
  }, []);
  return { markers, fetchMarkers }; // Return both markers and fetchMarkers
};

export const useHandlePress = () => {
  const { fetchMarkers } = useFetchMarkers();

  const handlePress = async (
    petugas,
    titikLokasi,
    setPetugas,
    setTitikLokasi,
    setIsSidebarVisible
  ) => {
    try {
      const { error } = await insertRecord(petugas, titikLokasi);

      if (error) {
        console.error("Error inserting record:", error);
        return; // Exit early if there was an error
      }

      setTitikLokasi(""); // Reset input fields
      setPetugas("");
      setIsSidebarVisible(false); // Hide the sidebar

      await fetchMarkers(); // Fetch and update the markers to include the new one
    } catch (err) {
      console.error("Unhandled error in hadlePress:", err);
    }
  };

  return { handlePress };
};
