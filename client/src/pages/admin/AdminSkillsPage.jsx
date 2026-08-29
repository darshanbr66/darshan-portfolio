import { useEffect, useState } from "react";
import {
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

import {
  getAdminSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../features/skills/skills.admin.service";

const emptyForm = {
  name: "",
  category: "",
  description: "",
  status: "published",
  order: 0,
};

function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    try {
      setIsLoading(true);
      setError("");

      const data = await getAdminSkills();

      setSkills(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load skills.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        name === "order"
          ? Number(value)
          : value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEditing(skill) {
    setEditingId(skill._id);

    setForm({
      name: skill.name || "",
      category: skill.category || "",
      description: skill.description || "",
      status: skill.status || "published",
      order: skill.order ?? 0,
    });

    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");
      setSuccess("");

      if (!form.name.trim()) {
        setError("Skill name is required.");
        return;
      }

      if (editingId) {
        await updateSkill(editingId, form);
        setSuccess("Skill updated successfully.");
      } else {
        await createSkill(form);
        setSuccess("Skill created successfully.");
      }

      resetForm();
      await loadSkills();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to save skill.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteSkill(id);

      setSkills((current) =>
        current.filter((skill) => skill._id !== id),
      );

      if (editingId === id) {
        resetForm();
      }

      setSuccess("Skill deleted successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete skill.",
      );
    }
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Technology
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
          Skills
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
          Add, edit, reorder, publish, or remove the
          technologies displayed on your portfolio.
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

      <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
        {/* Skills list */}

        <section className="rounded-2xl border border-[var(--color-border)]">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                All skills
              </h2>

              <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                {skills.length}{" "}
                {skills.length === 1
                  ? "skill"
                  : "skills"}
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-[var(--color-ink)]
                px-3
                py-2
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[var(--color-accent)]
              "
            >
              <Plus size={16} />
              Add skill
            </button>
          </div>

          {isLoading ? (
            <div className="px-6 py-10 text-sm text-[var(--color-ink-muted)]">
              Loading skills...
            </div>
          ) : skills.length === 0 ? (
            <div className="px-6 py-10 text-sm text-[var(--color-ink-muted)]">
              No skills available.
            </div>
          ) : (
            <div>
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] px-6 py-5 last:border-b-0"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-medium text-[var(--color-ink)]">
                        {skill.name}
                      </h3>

                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                          skill.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-[var(--color-surface-soft)] text-[var(--color-ink-muted)]"
                        }`}
                      >
                        {skill.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                      {skill.category || "Uncategorized"}
                      {" · "}
                      Order {skill.order}
                    </p>

                    {skill.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-[var(--color-ink-muted)]">
                        {skill.description}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        startEditing(skill)
                      }
                      className="
                        rounded-lg
                        px-3
                        py-2
                        text-sm
                        font-medium
                        text-[var(--color-ink)]
                        transition
                        hover:bg-[var(--color-surface-soft)]
                      "
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(skill._id)
                      }
                      className="
                        rounded-lg
                        p-2
                        text-red-600
                        transition
                        hover:bg-red-50
                      "
                      aria-label={`Delete ${skill.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Form */}

        <section className="h-fit rounded-2xl border border-[var(--color-border)] p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                {editingId
                  ? "Edit skill"
                  : "Add skill"}
              </h2>

              <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                {editingId
                  ? "Update the selected skill."
                  : "Add a technology to your portfolio."}
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg p-2 text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-soft)]"
                aria-label="Cancel editing"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <Field
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="React"
              required
            />

            <Field
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Frontend"
            />

            <Field
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Optional description"
              textarea
            />

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Order"
                name="order"
                type="number"
                value={form.order}
                onChange={handleChange}
                min="0"
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
                  <option value="draft">
                    Draft
                  </option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="
                    inline-flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[var(--color-border-strong)]
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-[var(--color-ink)]
                    transition
                    hover:bg-[var(--color-surface-soft)]
                  "
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="
                  inline-flex
                  flex-1
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
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {editingId ? (
                  <Save size={16} />
                ) : (
                  <Plus size={16} />
                )}

                {isSaving
                  ? "Saving..."
                  : editingId
                    ? "Save changes"
                    : "Add skill"}
              </button>
            </div>
          </form>
        </section>
      </div>
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
  textarea = false,
  min,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[var(--color-ink)]"
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={`${inputClass} resize-y`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          min={min}
          className={inputClass}
        />
      )}
    </div>
  );
}

export default AdminSkillsPage;
