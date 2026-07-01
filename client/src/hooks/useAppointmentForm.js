import { useState, useEffect } from "react";
import { TIME_SLOTS } from "../Data/BookingOptions";

export const useAppointmentForm = () => {
  const APP_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [formData, setFormData] = useState({
    service: "",
    fullname: "",
    email: "",
    date: "",
    time: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const validateLocally = () => {
    const errors = {};
    const required = ["service", "fullname", "email", "date", "time", "phone"];

    required.forEach((k) => {
      if (!formData[k]) errors[k] = "This field is required.";
    });

    if (
      formData.fullname &&
      !/^[\p{L}]+(?:[ '\-][\p{L}]+)+$/u.test(formData.fullname.trim())
    ) {
      errors.fullname = "Please enter a valid full name.";
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (
      formData.phone &&
      !/^(?:\+977|977)?(?:98|97|96)\d{8}$/.test(formData.phone)
    ) {
      errors.phone = "Please enter a valid Nepali mobile number.";
    }

    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        errors.date = "Date cannot be in the past.";
      }

      const dayOfWeek = selectedDate.getDay();
      if (dayOfWeek === 6) {
        errors.date = "The clinic is closed on Saturdays. Please select another day.";
      }
    }

    if (formData.date && formData.time) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate.getTime() === today.getTime()) {
        const now = new Date();
        const match = formData.time.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
        if (match) {
          let hours = parseInt(match[1]);
          const minutes = parseInt(match[2]);
          const meridian = match[3].toUpperCase();

          if (meridian === "PM" && hours !== 12) hours += 12;
          if (meridian === "AM" && hours === 12) hours = 0;

          if (!isNaN(hours) && !isNaN(minutes)) {
            const selectedMinutes = hours * 60 + minutes;
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const bufferMinutes = 30;

            if (selectedMinutes <= currentMinutes + bufferMinutes) {
              errors.time = "This time slot has passed. Please select a future time.";
            }
          }
        }
      }
    }

    return errors;
  };

  const getAvailableTimeSlots = () => {
    const selectedDate = formData.date ? new Date(formData.date) : null;

    if (!selectedDate) {
      return TIME_SLOTS;
    }

    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    const selectedMidnight = new Date(selectedDate);
    selectedMidnight.setHours(0, 0, 0, 0);

    if (selectedMidnight < todayMidnight) {
      return [];
    }

    if (selectedMidnight > todayMidnight) {
      return TIME_SLOTS;
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return TIME_SLOTS.filter((timeSlot) => {
      const match = timeSlot.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);

      if (!match) {
        return true;
      }

      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const meridian = match[3].toUpperCase();

      if (meridian === "PM" && hours !== 12) {
        hours += 12;
      }

      if (meridian === "AM" && hours === 12) {
        hours = 0;
      }

      const slotMinutes = hours * 60 + minutes;

      return slotMinutes > currentMinutes + 30;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setSuccessMessage("");
    setErrorMessage("");
    setFieldErrors({});

    const localErrors = validateLocally();
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      setErrorMessage("Please fill the required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${APP_URL}/api/appointments/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!response.ok || !data.success) {
        if (data.errors) setFieldErrors(data.errors);
        throw new Error(data.message || "Failed to book appointment");
      }

      setSuccessMessage(data.message || "Appointment booked successfully!");
      setFormData({
        service: "",
        fullname: "",
        email: "",
        date: "",
        time: "",
        phone: "",
      });
    } catch (error) {
      console.error("Appointment Error:", error);
      setErrorMessage(
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    successMessage,
    errorMessage,
    fieldErrors,
    handleChange,
    handleSubmit,
    getAvailableTimeSlots,
  };
};
