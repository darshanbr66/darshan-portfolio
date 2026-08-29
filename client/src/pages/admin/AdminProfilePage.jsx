import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  FileText,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "react-hot-toast";

import {
  getAdminProfile,
  updateProfile,
} from "../../features/profile/profile.service";

import {
  uploadFile,
  deleteFile,
  getFileUrl,
} from "../../features/files/files.admin.service";

const emptyProfile = {
  name: "",
  role: "",
  title: "",
  headline: "",
  about: "",
  location: "",
  email: "",
  socialLinks: [],
  resumeFileId: null,
  status: "published",
};

function AdminProfilePage() {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(emptyProfile);

  const [resume, setResume] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  const [error, setError] = useState("");

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
          resumeFileId: profile.resumeFileId || null,
          status: profile.status || "published",
        });

        setResume(
          profile.resumeFileId
            ? {
                id: profile.resumeFileId,
                filename: "Current resume",
              }
            : null,
        );
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

  async function handleResumeChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    event.target.value = "";

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF resume.");
      return;
    }

    if (file.size === 0) {
      toast.error("The selected resume is empty.");
      return;
    }

    const previousResumeId = form.resumeFileId;

    try {
      setIsUploadingResume(true);
      setError("");

      const uploadResult = await uploadFile(file);

      const newFileId = uploadResult.data?.id;

      if (!newFileId) {
        throw new Error(
          "Resume uploaded but no file ID was returned.",
        );
      }

      const result = await updateProfile({
        ...form,
        resumeFileId: newFileId,
      });

      setForm((current) => ({
        ...current,
        ...result.data,
        resumeFileId: newFileId,
      }));

      setResume({
        id: newFileId,
        filename: file.name,
      });

      /*
       * Delete the old resume only after the new resume
       * has been successfully uploaded and assigned.
       */
      if (
        previousResumeId &&
        String(previousResumeId) !== String(newFileId)
      ) {
        try {
          await deleteFile(previousResumeId);
        } catch (deleteError) {
          console.error(
            "Unable to delete previous resume:",
            deleteError,
          );
        }
      }

      toast.success("Resume uploaded successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to upload resume.",
      );
    } finally {
      setIsUploadingResume(false);
    }
  }

  async function handleRemoveResume() {
    if (!form.resumeFileId) {
      return;
    }

    const confirmed = window.confirm(
      "Remove the current resume from your portfolio?",
    );

    if (!confirmed) {
      return;
    }

    const fileId = form.resumeFileId;

    try {
      setIsUploadingResume(true);
      setError("");

      const result = await updateProfile({
        ...form,
        resumeFileId: null,
      });

      setForm((current) => ({
        ...current,
        ...result.data,
        resumeFileId: null,
      }));

      setResume(null);

      try {
        await deleteFile(fileId);
      } catch (deleteError) {
        console.error(
          "Unable to delete resume file:",
          deleteError,
        );
      }

      toast.success("Resume removed successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to remove resume.",
      );
    } finally {
      setIsUploadingResume(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");

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
        resumeFileId: result.data.resumeFileId || null,
        status: result.data.status || "published",
      });

      toast.success("Profile updated successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update profile.",
      );

      toast.error(
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
    <div>
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

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
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
                <option value="published">
                  Published
                </option>

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

        {/* Resume */}

        <section className="rounded-2xl border border-[var(--color-border)] p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Public resume
            </p>

            <h2 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
              Resume
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
              Upload the PDF that visitors can open from your
              portfolio.
            </p>
          </div>

          {resume ? (
            <div className="flex flex-col gap-5 rounded-xl border border-[var(--color-border)] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-soft)]">
                  <FileText
                    size={19}
                    className="text-[var(--color-ink)]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--color-ink)]">
                    {resume.filename}
                  </p>

                  <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                    PDF resume
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <a
                  href={getFileUrl(resume.id)}
                  target="_blank"
                  rel="noreferrer"
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
                    text-[var(--color-ink)]
                    transition
                    hover:bg-[var(--color-surface-soft)]
                  "
                >
                  <ExternalLink size={15} />
                  View
                </a>

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  disabled={isUploadingResume}
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
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <Upload size={15} />
                  {isUploadingResume
                    ? "Uploading..."
                    : "Replace"}
                </button>

                <button
                  type="button"
                  onClick={handleRemoveResume}
                  disabled={isUploadingResume}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-lg
                    p-2
                    text-red-600
                    transition
                    hover:bg-red-50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                  aria-label="Remove resume"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[var(--color-border-strong)] p-6">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-soft)]">
                    <FileText
                      size={19}
                      className="text-[var(--color-ink-muted)]"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[var(--color-ink)]">
                      No resume uploaded
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                      Select a PDF file to make it available
                      publicly.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  disabled={isUploadingResume}
                  className="
                    inline-flex
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
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <Upload size={16} />
                  {isUploadingResume
                    ? "Uploading..."
                    : "Upload resume"}
                </button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleResumeChange}
            className="hidden"
          />

          <p className="mt-4 text-xs text-[var(--color-ink-muted)]">
            PDF only. The uploaded resume will be displayed
            directly in the browser when visitors open it.
          </p>
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