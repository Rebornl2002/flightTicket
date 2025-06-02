// import { useState } from "react";
import { BASE_URL } from "../utils/config";

const useFetch = (url) => {
  console.log("anh nghi dep trai vl");
  async function fetchAPI() {
    let response = await fetch(BASE_URL);
    let data = await response.json();
    console.log(data);
    return data;
  }

  fetchAPI();
};

export default useFetch;
