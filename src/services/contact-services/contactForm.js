import axios from "axios";

export const contactFormService = async (name, email, phone, subject, message) => {
  return await axios.post(`/api/contact`, {
    name,
    email,
    phone,
    subject,
    message,
  });
};
