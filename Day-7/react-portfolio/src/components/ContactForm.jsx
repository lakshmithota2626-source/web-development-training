import React, { useState } from "react";

const EMPTY_FORM = { name: "", email: "", message: "" };

function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [feedback, setFeedback] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFeedback(`Thanks, ${form.name.trim()}. This demo does not send or store messages.`);
    setForm(EMPTY_FORM);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Name<input name="name" value={form.name} onChange={handleChange} maxLength="70" required /></label>
      <label>Email<input name="email" type="email" value={form.email} onChange={handleChange} maxLength="120" required /></label>
      <label>Message<textarea name="message" value={form.message} onChange={handleChange} rows="4" maxLength="500" required /></label>
      <button type="submit">Preview message</button>
      <p className="form-feedback" role="status" aria-live="polite">{feedback}</p>
    </form>
  );
}

export default ContactForm;