import React from "react";
import ContactForm from "../../components/ContactForm"; // Impor komponen ContactForm

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot
    isSubmitted: false,
    isError: false,
    loading: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    // Logic untuk menangani pengiriman formulir
  };

  return (
    <div>
      <h1>Kontak Kami</h1>
      <ContactForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    </div>
  );
}
