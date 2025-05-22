import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./ContactForm.css";
import { contactFormService } from "../../../../services/contact-services/contactForm";
import { contactSchema } from "./schema";
import { toast } from "react-hot-toast";

export function ContactForm() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    const { name, email, phone, subject, message } = data;
    try {
      // Simulate a delay in the response
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await contactFormService(
        name,
        email,
        phone,
        subject,
        message
      );
      if (response.status === 201) {
        toast.success("Message sent successfully");
        reset();
      }
    } catch (error) {
      toast.error("Error sending form, please try again");
      console.error(error);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          placeholder="Your name"
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>

      <div className="contact-row">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            inputMode="email"
            {...register("email")}
            placeholder="email@example.com"
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            {...register("phone")}
            placeholder="Your phone number"
          />
          {errors.phone && (
            <span className="error-message">{errors.phone.message}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
          placeholder="Your subject"
        />
        {errors.subject && (
          <span className="error-message">{errors.subject.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          {...register("message")}
          placeholder="Your message"
          maxLength={100}
        />
        {errors.message && (
          <span className="error-message">{errors.message.message}</span>
        )}
      </div>

      {isSubmitSuccessful && !isDirty && (
        <div className="success-message">
          <p>Message sent successfully! We will get back to you soon.</p>
        </div>
      )}

      <button
        type="submit"
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
