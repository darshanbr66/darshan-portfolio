import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
} from "lucide-react";
import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../features/experience/experience.admin.service";
import { useAdminExperience } from "../../features/experience/hook/useAdminExperience";

const emptyForm = {
  company: "",
  role: "",
  startDate: "",
  endDate: "Present",
  location: "",
  technologies: [],
  description: "",
  responsibilities: [],
  status: "published",
  order: 0,
};

function AdminExperiencePage() {
  const {
    data: experiences = [],
    isLoading,
    isError,
    refetch,
  } = useAdminExperience();

  const [form, setForm] = useState(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setIsFormOpen(true);
  }

  function openEdit(experience) {
    setEditingId(experience._id);

    setForm({
      company: experience.company || "",
      role: experience.role || "",
      startDate: experience.startDate || "",
      endDate: experience.endDate || "Present",
      location: experience.location || "",
      technologies: experience.technologies || [],
      description: experience.description || "",
      responsibilities: experience.responsibilities || [],
      status: experience.status || "published",
      order: experience.order ?? 0,
    });

    setError("");
    setSuccess("");
    setIsFormOpen(true);
  }

  function closeForm() {
    if (isSaving) return;

    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: name === "order" ? Number(value) : value,
    }));
  }

  function handleArrayChange(field, index, value) {
    setForm((current) => {
      const items = [...current[field]];
      items[index] = value;

      return {
        ...current,
        [field]: items,
      };
    });
  }

  function addArrayItem(field) {
    setForm((current) => ({
      ...current,
      [field]: [...current[field], ""],
    }));
  }

  function removeArrayItem(field, index) {
    setForm((current) => ({
      ...current,
      [field]: current[field].filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        ...form,
        technologies: form.technologies
          .map((item) => item.trim())
          .filter(Boolean),
        responsibilities: form.responsibilities
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (editingId) {
        await updateExperience(editingId, payload);
        setSuccess("Experience updated successfully.");
      } else {
        await createExperience(payload);
        setSuccess("Experience created successfully.");
      }

      await refetch();

      setIsFormOpen(false);
      setEditingId(null);
      setForm(emptyForm);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to save experience.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      await deleteExperience(id);
      await refetch();

      setSuccess("Experience deleted successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete experience.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Experience
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
            Professional experience
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
            Manage the professional experience displayed on
            your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="
            inline-flex
            items-center
            justify-center
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
          Add experience
        </button>
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

      {isLoading && (
        <div className="rounded-2xl border border-[var(--color-border)] p-8">
          <p className="text-sm text-[var(--color-ink-muted)]">
            Loading experiences...
          </p>
        </div>
      )}

      {isError && !isLoading && (
        <div className="rounded-2xl border border-[var(--color-border)] p-8">
          <p className="text-sm text-red-600">
            Unable to load experiences.
          </p>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="space-y-4">
          {experiences.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[var(--color-border-strong)] p-10 text-center">
              <p className="text-sm text-[var(--color-ink-muted)]">
                No experiences added yet.
              </p>
            </div>
          )}

          {experiences.map((experience) => (
            <article
              key={experience._id}
              className="rounded-2xl border border-[var(--color-border)] p-6 sm:p-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold text-[var(--color-ink)]">
                      {experience.role}
                    </h2>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        experience.status === "published"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {experience.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-medium text-[var(--color-ink-muted)]">
                    {experience.company}
                  </p>

                  <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                    {experience.startDate} —{" "}
                    {experience.endDate || "Present"}
                    {experience.location
                      ? ` · ${experience.location}`
                      : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(experience)}
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] px-3 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-surface-soft)]"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(experience._id)
                    }
                    disabled={deletingId === experience._id}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 size={15} />
                    {deletingId === experience._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>

              {experience.description && (
                <p className="mt-6 text-sm leading-7 text-[var(--color-ink-muted)]">
                  {experience.description}
                </p>
              )}

              {experience.technologies?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {experience.technologies.map(
                    (technology) => (
                      <span
                        key={technology}
                        className="rounded-lg bg-[var(--color-surface-soft)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink)]"
                      >
                        {technology}
                      </span>
                    ),
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 px-4 py-8">
          <div className="mx-auto max-w-3xl rounded-2xl bg-[var(--color-surface)] p-6 shadow-xl sm:p-8">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  Experience
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                  {editingId
                    ? "Edit experience"
                    : "Add experience"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-2 text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-soft)]"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                />

                <Field
                  label="Role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                />

                <Field
                  label="Start date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  placeholder="Nov 2024"
                  required
                />

                <Field
                  label="End date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  placeholder="Present"
                />

                <Field
                  label="Location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                />

                <Field
                  label="Order"
                  name="order"
                  type="number"
                  value={form.order}
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
                    <option value="published">
                      Published
                    </option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <TextArea
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
              />

              <ArrayField
                label="Technologies"
                items={form.technologies}
                onChange={(index, value) =>
                  handleArrayChange(
                    "technologies",
                    index,
                    value,
                  )
                }
                onAdd={() =>
                  addArrayItem("technologies")
                }
                onRemove={(index) =>
                  removeArrayItem("technologies", index)
                }
                placeholder="React"
              />

              <ArrayField
                label="Responsibilities"
                items={form.responsibilities}
                onChange={(index, value) =>
                  handleArrayChange(
                    "responsibilities",
                    index,
                    value,
                  )
                }
                onAdd={() =>
                  addArrayItem("responsibilities")
                }
                onRemove={(index) =>
                  removeArrayItem(
                    "responsibilities",
                    index,
                  )
                }
                placeholder="Developed..."
              />

              <div className="flex justify-end gap-3 border-t border-[var(--color-border)] pt-6">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={isSaving}
                  className="rounded-xl border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface-soft)]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--color-accent)] disabled:opacity-60"
                >
                  <Save size={16} />

                  {isSaving
                    ? "Saving..."
                    : editingId
                      ? "Save changes"
                      : "Create experience"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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

function ArrayField({
  label,
  items,
  onChange,
  onAdd,
  onRemove,
  placeholder,
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <label className="block text-sm font-medium text-[var(--color-ink)]">
          {label}
        </label>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)]"
        >
          <Plus size={15} />
          Add
        </button>
      </div>

      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-[var(--color-ink-muted)]">
            None added.
          </p>
        )}

        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-2"
          >
            <input
              value={item}
              onChange={(event) =>
                onChange(index, event.target.value)
              }
              placeholder={placeholder}
              className={inputClass}
            />

            <button
              type="button"
              onClick={() => onRemove(index)}
              className="shrink-0 rounded-xl px-3 text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminExperiencePage;
