import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import {
  updateContent,
} from "../../features/content/content.service";

import { useAdminContent } from "../../features/content/hooks/useAdminContent";

function AdminContentPage() {
  const { data: content, isLoading, isError } = useAdminContent();

  const [form, setForm] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (content) {
      setForm(content);
    }
  }, [content]);

  function handleChange(section, field, value) {
    setForm((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");
      setSuccess("");

      const result = await updateContent(form);

      setForm(result.data);
      setSuccess("Content updated successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update content.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading || !form) {
    return (
      <div>
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Content
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
            Portfolio content
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
            Loading editable portfolio content...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Content
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
            Portfolio content
          </h1>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Unable to load portfolio content.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Content
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
          Portfolio content
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
          Manage the editable text displayed across the public
          portfolio.
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

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <ContentSection
          title="Hero"
          description="Text displayed in the main introduction section."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Available for label"
              value={form.hero.availableForLabel}
              onChange={(event) =>
                handleChange(
                  "hero",
                  "availableForLabel",
                  event.target.value,
                )
              }
            />

            <Field
              label="Available for text"
              value={form.hero.availableForText}
              onChange={(event) =>
                handleChange(
                  "hero",
                  "availableForText",
                  event.target.value,
                )
              }
            />

            <Field
              label="Explore work label"
              value={form.hero.exploreWorkLabel}
              onChange={(event) =>
                handleChange(
                  "hero",
                  "exploreWorkLabel",
                  event.target.value,
                )
              }
            />

            <Field
              label="Scroll label"
              value={form.hero.scrollLabel}
              onChange={(event) =>
                handleChange(
                  "hero",
                  "scrollLabel",
                  event.target.value,
                )
              }
            />
          </div>
        </ContentSection>

        <ContentSection
          title="About"
          description="Text displayed in the About section."
        >
          <div className="space-y-5">
            <Field
              label="Section label"
              value={form.about.sectionLabel}
              onChange={(event) =>
                handleChange(
                  "about",
                  "sectionLabel",
                  event.target.value,
                )
              }
            />

            <Field
              label="Heading"
              value={form.about.heading}
              onChange={(event) =>
                handleChange(
                  "about",
                  "heading",
                  event.target.value,
                )
              }
            />

            <Field
              label="Background label"
              value={form.about.backgroundLabel}
              onChange={(event) =>
                handleChange(
                  "about",
                  "backgroundLabel",
                  event.target.value,
                )
              }
            />

            <TextArea
              label="Background text"
              value={form.about.backgroundText}
              onChange={(event) =>
                handleChange(
                  "about",
                  "backgroundText",
                  event.target.value,
                )
              }
            />
          </div>
        </ContentSection>

        <ContentSection
          title="Skills"
          description="Text displayed above the skills list."
        >
          <div className="space-y-5">
            <Field
              label="Section label"
              value={form.skills.sectionLabel}
              onChange={(event) =>
                handleChange(
                  "skills",
                  "sectionLabel",
                  event.target.value,
                )
              }
            />

            <Field
              label="Heading"
              value={form.skills.heading}
              onChange={(event) =>
                handleChange(
                  "skills",
                  "heading",
                  event.target.value,
                )
              }
            />

            <TextArea
              label="Description"
              value={form.skills.description}
              onChange={(event) =>
                handleChange(
                  "skills",
                  "description",
                  event.target.value,
                )
              }
            />
          </div>
        </ContentSection>

        <ContentSection
          title="Experience"
          description="Text displayed above the experience list."
        >
          <div className="space-y-5">
            <Field
              label="Section label"
              value={form.experience.sectionLabel}
              onChange={(event) =>
                handleChange(
                  "experience",
                  "sectionLabel",
                  event.target.value,
                )
              }
            />

            <Field
              label="Heading"
              value={form.experience.heading}
              onChange={(event) =>
                handleChange(
                  "experience",
                  "heading",
                  event.target.value,
                )
              }
            />

            <TextArea
              label="Description"
              value={form.experience.description}
              onChange={(event) =>
                handleChange(
                  "experience",
                  "description",
                  event.target.value,
                )
              }
            />
          </div>
        </ContentSection>

        <ContentSection
          title="Projects"
          description="Text displayed above the projects list."
        >
          <div className="space-y-5">
            <Field
              label="Section label"
              value={form.projects.sectionLabel}
              onChange={(event) =>
                handleChange(
                  "projects",
                  "sectionLabel",
                  event.target.value,
                )
              }
            />

            <Field
              label="Heading"
              value={form.projects.heading}
              onChange={(event) =>
                handleChange(
                  "projects",
                  "heading",
                  event.target.value,
                )
              }
            />

            <TextArea
              label="Description"
              value={form.projects.description}
              onChange={(event) =>
                handleChange(
                  "projects",
                  "description",
                  event.target.value,
                )
              }
            />
          </div>
        </ContentSection>

        <ContentSection
          title="Contact"
          description="Text displayed in the contact section."
        >
          <div className="space-y-5">
            <Field
              label="Section label"
              value={form.contact.sectionLabel}
              onChange={(event) =>
                handleChange(
                  "contact",
                  "sectionLabel",
                  event.target.value,
                )
              }
            />

            <Field
              label="Heading"
              value={form.contact.heading}
              onChange={(event) =>
                handleChange(
                  "contact",
                  "heading",
                  event.target.value,
                )
              }
            />

            <TextArea
              label="Description"
              value={form.contact.description}
              onChange={(event) =>
                handleChange(
                  "contact",
                  "description",
                  event.target.value,
                )
              }
            />
          </div>
        </ContentSection>

        <ContentSection
          title="Footer"
          description="Text displayed in the portfolio footer."
        >
          <div className="space-y-5">
            <Field
              label="Eyebrow"
              value={form.footer.eyebrow}
              onChange={(event) =>
                handleChange(
                  "footer",
                  "eyebrow",
                  event.target.value,
                )
              }
            />

            <TextArea
              label="Heading"
              value={form.footer.heading}
              onChange={(event) =>
                handleChange(
                  "footer",
                  "heading",
                  event.target.value,
                )
              }
            />

            <Field
              label="Button label"
              value={form.footer.buttonLabel}
              onChange={(event) =>
                handleChange(
                  "footer",
                  "buttonLabel",
                  event.target.value,
                )
              }
            />
          </div>
        </ContentSection>

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

            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function ContentSection({
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[var(--color-ink)]">
          {title}
        </h2>

        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
          {description}
        </p>
      </div>

      {children}
    </section>
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
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[var(--color-ink)]">
        {label}
      </label>

      <input
        type="text"
        value={value || ""}
        onChange={onChange}
        className={inputClass}
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[var(--color-ink)]">
        {label}
      </label>

      <textarea
        value={value || ""}
        onChange={onChange}
        rows={4}
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

export default AdminContentPage;