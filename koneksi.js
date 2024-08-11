import React, { useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function Koneksi() {
  useEffect(() => {
    const fetchData = async () => {
      let { data, error } = await supabase
        .from("data_titik")
        .select("id, nama, geom");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        // console.log("Data from Supabase:", data);
      }
    };
    fetchData();
  }, []);
}

export async function insertRecord(petugas, coordinates) {
  try {
    const geom = `POINT(${coordinates})`;
    const { data, error } = await supabase
      .from("data_titik")
      .insert([{ nama: petugas, geom: geom }]);

    if (error) {
      console.error("Error inserting record:", error);
      return { error }; // Return the error
    } else {
      console.log("Record inserted successfully:", data);
      alert("Sukses");
      return { data }; // Return the inserted data
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error }; // Return the caught error
  }
}
