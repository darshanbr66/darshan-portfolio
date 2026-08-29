import { useState } from "react";
import {
  ArrowUp,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  updateContent,
} from "../../features/content/content.service";

import { useAdminContent } from "../../features/content/hooks/useAdminContent";

const sectionNavigation = [
  {
    id: "content-hero",
    label: "Hero",
  },
  {
    id: "content-about",
    label: "About",
  },
  {
    id: "content-skills",
    label: "Skills",
  },
  {
    id: "content-experience",
    label: "Experience",
  },
  {
    id: "content-projects",
    label: "Projects",
  },
  {
    id: "content-contact",
    label: "Contact",
  },
  {
    id: "content-footer",
    label: "Footer",
  },
];

function AdminContentPage() {
  const {
    data: content,
    isLoading,
    isError,
  } = useAdminContent();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError || !content) {
    return <ErrorState />;
  }

  return <ContentEditor initialContent={content} />;
}

function LoadingState() {
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

function ErrorState() {
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

function ContentEditor({ initialContent }) {
  const [form, setForm] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

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

    if (!form || isSaving) {
      return;
    }

    try {
      setIsSaving(true);

      const result = await updateContent(form);

      setForm(result.data);

      toast.success("Content updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update content.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);

    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="pb-24">
      {/* Header */}

      <div className="mb-8">
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

      {/* Quick navigation */}

      <div className="sticky top-4 z-30 mb-8">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-canvas)]/95 p-2 shadow-[0_4px_20px_rgba(17,17,17,0.05)] backdrop-blur-xl">
          <div className="flex gap-1 overflow-x-auto">
            {sectionNavigation.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() =>
                  scrollToSection(section.id)
                }
                className="
                  shrink-0
                  rounded-xl
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-[var(--color-ink-muted)]
                  transition-colors
                  hover:bg-[var(--color-surface-soft)]
                  hover:text-[var(--color-ink)]
                  sm:px-4
                "
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form
        id="content-edit-form"
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* Hero */}

        <ContentSection
          id="content-hero"
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

        {/* About */}

        <ContentSection
          id="content-about"
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

        {/* Skills */}

        <ContentSection
          id="content-skills"
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

        {/* Experience */}

        <ContentSection
          id="content-experience"
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

        {/* Projects */}

        <ContentSection
          id="content-projects"
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

        {/* Contact */}

        <ContentSection
          id="content-contact"
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

        {/* Footer */}

        <ContentSection
          id="content-footer"
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

        {/* Bottom save fallback */}

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

      {/* Sticky save action */}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-canvas)]/95 px-4 py-3 shadow-[0_-4px_20px_rgba(17,17,17,0.05)] backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            type="button"
            onClick={scrollToTop}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              px-3
              py-2.5
              text-sm
              font-medium
              text-[var(--color-ink-muted)]
              transition
              hover:bg-[var(--color-surface-soft)]
              hover:text-[var(--color-ink)]
            "
          >
            <ArrowUp size={16} />

            <span className="hidden sm:inline">
              Back to top
            </span>
          </button>

          <button
            type="submit"
            form="content-edit-form"
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
      </div>
    </div>
  );
}

function ContentSection({
  id,
  title,
  description,
  children,
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-2xl border border-[var(--color-border)] p-6 sm:p-8"
    >
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