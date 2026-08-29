import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  X,
  Save,
} from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";

import { useAdminProjects } from "../../features/projects/hooks/useAdminProjects";
import {
  createProject,
  updateProject,
  deleteProject,
} from "../../features/projects/projects.admin.service";

function AdminProjectsPage() {
  const queryClient = useQueryClient();

  const {
    data: projects = [],
    isLoading,
    isError,
    error,
  } = useAdminProjects();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    shortDescription: "",
    description: "",
    technologies: "",
    thumbnail: "",
    images: "",
    links: "",
    status: "draft",
    featured: false,
    order: 0,
  });

  function openCreateForm() {
    setEditingProject(null);
    setForm({
      title: "",
      slug: "",
      category: "",
      shortDescription: "",
      description: "",
      technologies: "",
      thumbnail: "",
      images: "",
      links: "",
      status: "draft",
      featured: false,
      order: 0,
    });

    setFormError("");
    setIsFormOpen(true);
  }

  function openEditForm(project) {
    setForm({
      title: project.title || "",
      slug: project.slug || "",
      category: project.category || "",
      shortDescription: project.shortDescription || "",
      description: project.description || "",
      technologies: (project.technologies || []).join(", "),
      thumbnail: project.thumbnail || "",
      images: (project.images || []).join("\n"),
      links: (project.links || [])
        .map(
          (link) =>
            `${link.label || ""} | ${link.url || ""}`,
        )
        .join("\n"),
      status: project.status || "draft",
      featured: project.featured || false,
      order: project.order || 0,
    });

    setEditingProject(project);
    setFormError("");
    setIsFormOpen(true);
  }

  function closeForm() {
    if (isSaving) return;

    setIsFormOpen(false);
    setEditingProject(null);
    setFormError("");
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleTitleChange(event) {
    const value = event.target.value;

    setForm((current) => ({
      ...current,
      title: value,
      slug: current.slug
        ? current.slug
        : value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, ""),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setFormError("");

      const projectData = {
        title: form.title.trim(),
        slug: form.slug.trim().toLowerCase(),
        category: form.category.trim(),
        shortDescription: form.shortDescription.trim(),
        description: form.description.trim(),

        technologies: form.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        thumbnail: form.thumbnail.trim(),

        images: form.images
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        links: form.links
          .split("\n")
          .map((line) => {
            const [label, ...urlParts] = line.split("|");

            return {
              label: label?.trim() || "",
              url: urlParts.join("|").trim(),
            };
          })
          .filter((link) => link.url),

        status: form.status,
        featured: form.featured,
        order: Number(form.order) || 0,
      };

      if (editingProject) {
        await updateProject(editingProject._id, projectData);
      } else {
        await createProject(projectData);
      }

      await queryClient.invalidateQueries({
        queryKey: ["admin", "projects"],
      });

      setIsFormOpen(false);
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          "Unable to create project.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(project) {
    const confirmed = window.confirm(
      `Delete "${project.title}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await deleteProject(project._id);

      await queryClient.invalidateQueries({
        queryKey: ["admin", "projects"],
      });
    } catch (error) {
      window.alert(
        error.response?.data?.message ||
          "Unable to delete project.",
      );
    }
  }

  if (isLoading) {
    return (
      <div>
        <PageHeading />

        <p className="mt-6 text-sm text-[var(--color-ink-muted)]">
          Loading projects...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <PageHeading />

        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error?.response?.data?.message ||
            "Unable to load projects."}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10 flex items-start justify-between gap-6">
        <PageHeading />

        <button
          type="button"
          onClick={openCreateForm}
          className="
            inline-flex
            shrink-0
            items-center
            gap-2
            rounded-xl
            bg-[var(--color-ink)]
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[var(--color-accent)]
          "
        >
          <Plus size={16} />
          Add project
        </button>
      </div>

      {isFormOpen && (
        <ProjectForm
          form={form}
          isSaving={isSaving}
          error={formError}
          onChange={handleChange}
          onTitleChange={handleTitleChange}
          onSubmit={handleSubmit}
          onClose={closeForm}
          isEditing={Boolean(editingProject)}
        />
      )}

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-[var(--color-border)] p-8">
          <p className="text-sm text-[var(--color-ink-muted)]">
            No projects found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="
                rounded-2xl
                border
                border-[var(--color-border)]
                p-5
                sm:p-6
              "
            >
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                      {project.title}
                    </h2>

                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-surface-soft)] px-2.5 py-1 text-xs font-medium text-[var(--color-ink)]">
                        <Star size={12} />
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                    {project.category}
                  </p>

                  {project.shortDescription && (
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
                      {project.shortDescription}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[var(--color-ink-muted)]">
                      {project.status}
                    </span>

                    <span className="text-[var(--color-ink-muted)]">
                      Order: {project.order}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(project)}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-[var(--color-border-strong)]
                      px-3
                      py-2
                      text-sm
                      font-medium
                      text-[var(--color-ink-muted)]
                      opacity-50
                    "
                  >
                    <Pencil size={15} />
                    <span className="hidden sm:inline">
                      Edit
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(project)}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-lg
                      px-3
                      py-2
                      text-red-600
                      transition
                      hover:bg-red-50
                    "
                    aria-label={`Delete ${project.title}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PageHeading() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
        Projects
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
        Manage projects.
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
        Create and manage the projects displayed on your
        portfolio.
      </p>
    </div>
  );
}

function ProjectForm({
  form,
  isSaving,
  error,
  onChange,
  onTitleChange,
  onSubmit,
  onClose,
  isEditing,
}) {
  return (
    <section className="mb-8 rounded-2xl border border-[var(--color-border)] p-6 sm:p-8">
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-ink)]">
            {isEditing ? "Edit project" : "Add project"}
          </h2>

          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
            {isEditing
              ? "Update the project information."
              : "Add a new project to your portfolio."}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={isSaving}
          className="rounded-lg p-2 text-[var(--color-ink-muted)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-ink)]"
          aria-label="Close form"
        >
          <X size={18} />
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Title"
            name="title"
            value={form.title}
            onChange={onTitleChange}
            required
            placeholder="My Portfolio"
          />

          <Field
            label="Slug"
            name="slug"
            value={form.slug}
            onChange={onChange}
            required
            placeholder="my-portfolio"
          />

          <Field
            label="Category"
            name="category"
            value={form.category}
            onChange={onChange}
            required
            placeholder="Web Development"
          />

          <Field
            label="Order"
            name="order"
            type="number"
            value={form.order}
            onChange={onChange}
          />
        </div>

        <TextArea
          label="Short description"
          name="shortDescription"
          value={form.shortDescription}
          onChange={onChange}
          rows={3}
        />

        <TextArea
          label="Description"
          name="description"
          value={form.description}
          onChange={onChange}
          rows={6}
        />

        <Field
          label="Technologies"
          name="technologies"
          value={form.technologies}
          onChange={onChange}
          placeholder="React, Node.js, MongoDB"
        />

        <Field
          label="Thumbnail URL"
          name="thumbnail"
          type="url"
          value={form.thumbnail}
          onChange={onChange}
          placeholder="https://..."
        />

        <TextArea
          label="Image URLs"
          name="images"
          value={form.images}
          onChange={onChange}
          rows={4}
          placeholder={"One URL per line"}
        />

        <TextArea
          label="Project links"
          name="links"
          value={form.links}
          onChange={onChange}
          rows={4}
          placeholder={"GitHub | https://github.com/...\nLive | https://..."}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--color-ink)]">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className={inputClass}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <label className="flex items-center gap-3 pt-8 text-sm font-medium text-[var(--color-ink)]">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={onChange}
              className="h-4 w-4"
            />

            Featured project
          </label>
        </div>

        <div className="flex justify-end gap-3 border-t border-[var(--color-border)] pt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="
              rounded-xl
              border
              border-[var(--color-border-strong)]
              px-5
              py-3
              text-sm
              font-medium
              text-[var(--color-ink)]
              transition
              hover:bg-[var(--color-surface-soft)]
            "
          >
            Cancel
          </button>

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
              ? isEditing
                ? "Saving..."
                : "Creating..."
              : isEditing
                ? "Save changes"
                : "Create project"}
          </button>
        </div>
      </form>
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

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

export default AdminProjectsPage;
