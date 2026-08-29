import { useRef, useState } from "react";
import {
  Upload,
  File,
  ExternalLink,
  Trash2,
  Check,
  FileText,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useAdminFiles } from "../../features/files/hook/useAdminFiles";
import {
  uploadFile,
  setResume,
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
  const [settingResumeId, setSettingResumeId] = useState(null);
  const [deletingFileId, setDeletingFileId] = useState(null);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setIsUploading(true);

      await uploadFile(file);

      await queryClient.invalidateQueries({
        queryKey: ["admin", "files"],
      });

      toast.success("File uploaded successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to upload file.",
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  async function handleSetResume(file) {
    try {
      setSettingResumeId(String(file.id));

      await setResume(file.id);

      await queryClient.invalidateQueries({
        queryKey: ["admin", "files"],
      });

      toast.success("Resume updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to set resume.",
      );
    } finally {
      setSettingResumeId(null);
    }
  }

  async function handleDelete(file) {
    if (file.isResume) {
      toast.error(
        "The active resume cannot be deleted. Set another resume first.",
      );

      return;
    }

    const confirmed = window.confirm(
      `Delete "${file.filename}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingFileId(String(file.id));

      await deleteFile(file.id);

      await queryClient.invalidateQueries({
        queryKey: ["admin", "files"],
      });

      toast.success("File deleted successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete file.",
      );
    } finally {
      setDeletingFileId(null);
    }
  }

  if (isLoading) {
    return (
      <div>
        <PageHeading />

        <div className="mt-8 space-y-4">
          {[1, 2, 3].map((item) => (
            <FileSkeleton key={item} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <PageHeading />

        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
          {error?.response?.data?.message ||
            "Unable to load files."}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <PageHeading />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="
            inline-flex
            shrink-0
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
          {files.map((file) => {
            const fileId = String(file.id);
            const isPdf =
              file.contentType === "application/pdf";

            const isSettingResume =
              settingResumeId === fileId;

            const isDeleting =
              deletingFileId === fileId;

            return (
              <div
                key={fileId}
                className="
                  rounded-2xl
                  border
                  border-[var(--color-border)]
                  p-5
                  transition
                  sm:p-6
                "
              >
                <div className="flex flex-col gap-5">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-soft)]">
                      {isPdf ? (
                        <FileText
                          size={19}
                          className="text-[var(--color-ink-muted)]"
                        />
                      ) : (
                        <File
                          size={19}
                          className="text-[var(--color-ink-muted)]"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="break-all text-sm font-semibold text-[var(--color-ink)]">
                          {file.filename}
                        </p>

                        {file.isResume && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-ink)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                            <Check size={11} />
                            Active Resume
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                        {file.contentType} ·{" "}
                        {formatFileSize(file.size)}
                      </p>

                      <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                        {formatDate(file.uploadDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 border-t border-[var(--color-border)] pt-4">
                    {isPdf && !file.isResume && (
                      <button
                        type="button"
                        onClick={() =>
                          handleSetResume(file)
                        }
                        disabled={
                          isSettingResume ||
                          Boolean(settingResumeId)
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-lg
                          bg-[var(--color-ink)]
                          px-3
                          py-2
                          text-sm
                          font-medium
                          text-white
                          transition
                          hover:bg-[var(--color-accent)]
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        <Check size={15} />

                        {isSettingResume
                          ? "Setting..."
                          : "Set as Resume"}
                      </button>
                    )}

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
                      Open
                    </a>

                    {!file.isResume && (
                      <button
                        type="button"
                        onClick={() => handleDelete(file)}
                        disabled={isDeleting}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-lg
                          px-3
                          py-2
                          text-sm
                          font-medium
                          text-red-600
                          transition
                          hover:bg-red-50
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        <Trash2 size={15} />

                        {isDeleting
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
        Upload files and manage the document used as your
        public resume.
      </p>
    </div>
  );
}

function FileSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[var(--color-border)] p-6">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 shrink-0 rounded-xl bg-[var(--color-surface-soft)]" />

        <div className="flex-1 space-y-3">
          <div className="h-4 w-56 rounded bg-[var(--color-surface-soft)]" />
          <div className="h-3 w-40 rounded bg-[var(--color-surface-soft)]" />
          <div className="h-3 w-28 rounded bg-[var(--color-surface-soft)]" />
        </div>
      </div>
    </div>
  );
}

function formatFileSize(bytes) {
  if (!bytes) {
    return "0 Bytes";
  }

  const units = ["Bytes", "KB", "MB", "GB"];

  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );

  return `${(
    bytes /
    1024 ** index
  ).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleString();
}

export default AdminFilesPage;