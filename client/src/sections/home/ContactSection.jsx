import { useState } from "react";
import { Mail } from "lucide-react";
import { sendContactMessage } from "../../features/contact/contact.service";
import { useProfile } from "../../features/profile/hooks/useProfile";
import Skeleton from "../../components/ui/Skeleton";

function ContactSection() {
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useProfile();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    setIsSubmitting(true);

    try {
      await sendContactMessage(form);

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setStatus({
        type: "success",
        message: "Your message has been received.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to send your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const email = profile?.email;

  return (
    <section
      id="contact"
      className="border-t border-[var(--color-border)]"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-12 lg:py-32">
        {/* Contact information */}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Contact
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl">
            Get in touch
          </h2>

          <p className="mt-6 max-w-md text-base leading-7 text-[var(--color-muted)]">
            For professional opportunities, project discussions, or other
            enquiries.
          </p>

          {isProfileLoading && (
            <Skeleton
              className="mt-8 h-5 w-48"
              variant="text"
            />
          )}

          {!isProfileLoading && !isProfileError && email && (
            <a
              href={`mailto:${email}`}
              className="mt-8 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-[var(--color-text)] transition-opacity hover:opacity-60"
            >
              <Mail size={17} />
              {email}
            </a>
          )}
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-[var(--color-border)] pt-8"
        >
          <div className="grid gap-6">
            {/* Name */}
            <label className="grid gap-2">
              <span className="text-sm font-medium text-[var(--color-text)]">
                Name
              </span>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                maxLength={120}
                autoComplete="name"
                className="min-h-12 border border-[var(--color-border-strong)] bg-transparent px-4 text-base outline-none transition-colors focus:border-[var(--color-text)]"
              />
            </label>

            {/* Email */}
            <label className="grid gap-2">
              <span className="text-sm font-medium text-[var(--color-text)]">
                Email
              </span>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                maxLength={200}
                autoComplete="email"
                className="min-h-12 border border-[var(--color-border-strong)] bg-transparent px-4 text-base outline-none transition-colors focus:border-[var(--color-text)]"
              />
            </label>

            {/* Message */}
            <label className="grid gap-2">
              <span className="text-sm font-medium text-[var(--color-text)]">
                Message
              </span>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                maxLength={5000}
                rows={5}
                className="resize-y border border-[var(--color-border-strong)] bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-[var(--color-text)]"
              />
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-12 w-full bg-[var(--color-text)] px-6 text-sm font-medium text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>

            {/* Status */}
            {status.message && (
              <p
                className={`text-sm ${
                  status.type === "error"
                    ? "text-red-700"
                    : "text-[var(--color-muted)]"
                }`}
              >
                {status.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;