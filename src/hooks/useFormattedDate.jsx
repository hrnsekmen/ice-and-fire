import { useState, useEffect } from "react";

// Months array to convert month index to month name
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const useFormattedDate = (inputDateString) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formatDateString = () => {
      const dateObject = new Date(inputDateString);
      const year = dateObject.getFullYear();
      const monthIndex = dateObject.getMonth();
      const day = dateObject.getDate();
      setFormattedDate(`${year} ${months[monthIndex]} ${day}`);
    };

    formatDateString();
  }, [inputDateString]);

  return formattedDate;
};

export default useFormattedDate;
