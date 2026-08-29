import { useEffect, useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import {
  getAdminProfile,
  updateProfile,
} from "../../features/profile/profile.service";

function AdminProfilePage() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    title: "",
    headline: "",
    about: "",
    location: "",
    email: "",
    socialLinks: [],
    status: "published",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        setIsLoading(true);
        setError("");

        const profile = await getAdminProfile();

        setForm({
          name: profile.name || "",
          role: profile.role || "",
          title: profile.title || "",
          headline: profile.headline || "",
          about: profile.about || "",
          location: profile.location || "",
          email: profile.email || "",
          socialLinks: profile.socialLinks || [],
          status: profile.status || "published",
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load profile.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSocialLinkChange(index, field, value) {
    setForm((current) => {
      const socialLinks = [...current.socialLinks];

      socialLinks[index] = {
        ...socialLinks[index],
        [field]: value,
      };

      return {
        ...current,
        socialLinks,
      };
    });
  }

  function addSocialLink() {
    setForm((current) => ({
      ...current,
      socialLinks: [
        ...current.socialLinks,
        {
          id: "",
          label: "",
          url: "",
        },
      ],
    }));
  }

  function removeSocialLink(index) {
    setForm((current) => ({
      ...current,
      socialLinks: current.socialLinks.filter(
        (_, linkIndex) => linkIndex !== index,
      ),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");
      setSuccess("");

      const result = await updateProfile(form);

      setForm({
        name: result.data.name || "",
        role: result.data.role || "",
        title: result.data.title || "",
        headline: result.data.headline || "",
        about: result.data.about || "",
        location: result.data.location || "",
        email: result.data.email || "",
        socialLinks: result.data.socialLinks || [],
        status: result.data.status || "published",
      });

      setSuccess("Profile updated successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update profile.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Profile
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
          Profile
        </h1>

        <p className="mt-6 text-sm text-[var(--color-ink-muted)]">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-full">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Profile
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
          Personal information
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
          Manage the information displayed in your portfolio.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic information */}

        <section className="rounded-2xl border border-[var(--color-border)] p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[var(--color-ink)]">
              Basic information
            </h2>

            <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
              Information shown throughout the portfolio.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Field
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
            />

            <Field
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

            <Field
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
            />

            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--color-ink)]">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </section>

        {/* Website content */}

        <section className="rounded-2xl border border-[var(--color-border)] p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[var(--color-ink)]">
              Website content
            </h2>

            <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
              Text displayed in the Hero and About sections.
            </p>
          </div>

          <div className="space-y-6">
            <TextArea
              label="Headline"
              name="headline"
              value={form.headline}
              onChange={handleChange}
              rows={3}
            />

            <TextArea
              label="About"
              name="about"
              value={form.about}
              onChange={handleChange}
              rows={7}
            />
          </div>
        </section>

        {/* Social links */}

        <section className="rounded-2xl border border-[var(--color-border)] p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                Social links
              </h2>

              <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                Manage links displayed on your portfolio.
              </p>
            </div>

            <button
              type="button"
              onClick={addSocialLink}
              className="
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-lg
                border
                border-[var(--color-border-strong)]
                px-3
                py-2
                text-sm
                font-medium
                text-[var(--color-ink)]
                transition
                hover:bg-[var(--color-surface-soft)]
              "
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          <div className="space-y-5">
            {form.socialLinks.length === 0 && (
              <p className="text-sm text-[var(--color-ink-muted)]">
                No social links added.
              </p>
            )}

            {form.socialLinks.map((link, index) => (
              <div
                key={index}
                className="rounded-xl border border-[var(--color-border)] p-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="ID"
                    value={link.id}
                    onChange={(event) =>
                      handleSocialLinkChange(
                        index,
                        "id",
                        event.target.value,
                      )
                    }
                    placeholder="github"
                  />

                  <Field
                    label="Label"
                    value={link.label}
                    onChange={(event) =>
                      handleSocialLinkChange(
                        index,
                        "label",
                        event.target.value,
                      )
                    }
                    placeholder="GitHub"
                  />

                  <div className="sm:col-span-2">
                    <Field
                      label="URL"
                      type="url"
                      value={link.url}
                      onChange={(event) =>
                        handleSocialLinkChange(
                          index,
                          "url",
                          event.target.value,
                        )
                      }
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeSocialLink(index)
                  }
                  className="
                    mt-4
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-red-600
                    transition
                    hover:text-red-700
                  "
                >
                  <Trash2 size={15} />
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Save */}

        <div className="flex justify-end border-t border-[var(--color-border)] pt-6">
          <button
            type="submit"
            disabled={isSaving}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[var(--color-ink)]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[var(--color-accent)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Save size={16} />

            {isSaving
              ? "Saving..."
              : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputClass = `
  w-full
  rounded-xl
  border
  border-[var(--color-border-strong)]
  bg-transparent
  px-4
  py-3
  text-sm
  text-[var(--color-ink)]
  outline-none
  transition
  focus:border-[var(--color-ink)]
`;

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  rows,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

export default AdminProfilePage;