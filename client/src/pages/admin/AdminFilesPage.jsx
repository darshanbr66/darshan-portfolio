import { useRef, useState } from "react";
import {
  Upload,
  File,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { useAdminFiles } from "../../features/files/hook/useAdminFiles";
import {
  uploadFile,
  deleteFile,
  getFileUrl,
} from "../../features/files/files.admin.service";

function AdminFilesPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const {
    data: files = [],
    isLoading,
    isError,
    error,
  } = useAdminFiles();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setIsUploading(true);
      setUploadError("");

      await uploadFile(file);

      await queryClient.invalidateQueries({
        queryKey: ["admin", "files"],
      });
    } catch (error) {
      setUploadError(
        error.response?.data?.message ||
          "Unable to upload file.",
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  async function handleDelete(file) {
    const confirmed = window.confirm(
      `Delete "${file.filename}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await deleteFile(file.id);

      await queryClient.invalidateQueries({
        queryKey: ["admin", "files"],
      });
    } catch (error) {
      window.alert(
        error.response?.data?.message ||
          "Unable to delete file.",
      );
    }
  }

  if (isLoading) {
    return (
      <div>
        <PageHeading />

        <p className="mt-6 text-sm text-[var(--color-ink-muted)]">
          Loading files...
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
            "Unable to load files."}
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
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
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
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <Upload size={16} />

          {isUploading ? "Uploading..." : "Upload file"}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {uploadError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {uploadError}
        </div>
      )}

      {files.length === 0 ? (
        <div className="rounded-2xl border border-[var(--color-border)] p-8">
          <div className="flex items-center gap-3">
            <File
              size={20}
              className="text-[var(--color-ink-muted)]"
            />

            <p className="text-sm text-[var(--color-ink-muted)]">
              No files uploaded yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {files.map((file) => (
            <div
              key={String(file.id)}
              className="
                rounded-2xl
                border
                border-[var(--color-border)]
                p-5
                sm:p-6
              "
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-soft)]">
                    <File
                      size={18}
                      className="text-[var(--color-ink-muted)]"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--color-ink)]">
                      {file.filename}
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                      {file.contentType} · {formatFileSize(file.size)}
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                      {formatDate(file.uploadDate)}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={getFileUrl(file.id)}
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
                    <span className="hidden sm:inline">
                      Open
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDelete(file)}
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
                    aria-label={`Delete ${file.filename}`}
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
        Files
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
        Manage files.
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
        Upload and manage files stored with your portfolio.
      </p>
    </div>
  );
}

function formatFileSize(bytes) {
  if (!bytes) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(
    Math.log(bytes) / Math.log(1024),
  );

  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function formatDate(value) {
  if (!value) return "";

  return new Date(value).toLocaleString();
}

export default AdminFilesPage;
