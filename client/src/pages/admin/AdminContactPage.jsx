import { useState } from "react";
import {
  Mail,
  Trash2,
  Check,
  Reply,
  X,
} from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";

import { useAdminContactMessages } from "../../features/contact/hook/useAdminContactMessages";
import {
  updateContactMessageStatus,
  deleteContactMessage,
} from "../../features/contact/contact.admin.service";

function AdminContactPage() {
  const queryClient = useQueryClient();

  const {
    data: messages = [],
    isLoading,
    isError,
    error,
  } = useAdminContactMessages();

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleStatusChange(id, status) {
    try {
      setIsUpdating(true);

      await updateContactMessageStatus(id, status);

      await queryClient.invalidateQueries({
        queryKey: ["admin", "contact-messages"],
      });

      setSelectedMessage((current) =>
        current?._id === id
          ? { ...current, status }
          : current,
      );
    } catch (error) {
      window.alert(
        error.response?.data?.message ||
          "Unable to update message status.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDelete(message) {
    const confirmed = window.confirm(
      `Delete the message from "${message.name}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await deleteContactMessage(message._id);

      await queryClient.invalidateQueries({
        queryKey: ["admin", "contact-messages"],
      });

      if (selectedMessage?._id === message._id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      window.alert(
        error.response?.data?.message ||
          "Unable to delete contact message.",
      );
    }
  }

  function formatDate(date) {
    if (!date) return "";

    return new Date(date).toLocaleString();
  }

  if (isLoading) {
    return (
      <div>
        <PageHeading />

        <p className="mt-6 text-sm text-[var(--color-ink-muted)]">
          Loading messages...
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
            "Unable to load contact messages."}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeading />

      <div className="mt-10">
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-[var(--color-border)] p-8">
            <div className="flex items-center gap-3">
              <Mail
                size={18}
                className="text-[var(--color-ink-muted)]"
              />

              <p className="text-sm text-[var(--color-ink-muted)]">
                No contact messages yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className="
                  rounded-2xl
                  border
                  border-[var(--color-border)]
                  p-5
                  sm:p-6
                "
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMessage(message);

                      if (message.status === "new") {
                        handleStatusChange(
                          message._id,
                          "read",
                        );
                      }
                    }}
                    className="min-w-0 text-left"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                        {message.name}
                      </h2>

                      <StatusBadge status={message.status} />
                    </div>

                    <p className="mt-1 break-all text-sm text-[var(--color-ink-muted)]">
                      {message.email}
                    </p>

                    <p className="mt-4 line-clamp-2 max-w-3xl text-sm leading-6 text-[var(--color-ink-muted)]">
                      {message.message}
                    </p>

                    <p className="mt-4 text-xs text-[var(--color-ink-muted)]">
                      {formatDate(message.createdAt)}
                    </p>
                  </button>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {message.status !== "read" && (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() =>
                          handleStatusChange(
                            message._id,
                            "read",
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] transition hover:bg-[var(--color-surface-soft)] disabled:opacity-50"
                      >
                        <Check size={15} />
                        <span className="hidden sm:inline">
                          Read
                        </span>
                      </button>
                    )}

                    {message.status !== "replied" && (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() =>
                          handleStatusChange(
                            message._id,
                            "replied",
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] transition hover:bg-[var(--color-surface-soft)] disabled:opacity-50"
                      >
                        <Reply size={15} />
                        <span className="hidden sm:inline">
                          Replied
                        </span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(message)
                      }
                      className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-red-600 transition hover:bg-red-50"
                      aria-label={`Delete message from ${message.name}`}
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

      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          isUpdating={isUpdating}
          onClose={() => setSelectedMessage(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          formatDate={formatDate}
        />
      )}
    </div>
  );
}

function PageHeading() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
        Contact
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
        Messages.
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
        View and manage messages submitted through your
        portfolio contact form.
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const labels = {
    new: "New",
    read: "Read",
    replied: "Replied",
  };

  return (
    <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs font-medium text-[var(--color-ink-muted)]">
      {labels[status] || status}
    </span>
  );
}

function MessageModal({
  message,
  isUpdating,
  onClose,
  onStatusChange,
  onDelete,
  formatDate,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[var(--color-background)] p-6 shadow-xl sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Message
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">
              {message.name}
            </h2>

            <a
              href={`mailto:${message.email}`}
              className="mt-1 block break-all text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            >
              {message.email}
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--color-ink-muted)] transition hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-ink)]"
            aria-label="Close message"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-8 rounded-xl border border-[var(--color-border)] p-5">
          <p className="whitespace-pre-wrap text-sm leading-7 text-[var(--color-ink)]">
            {message.message}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-[var(--color-ink-muted)]">
          <StatusBadge status={message.status} />
          <span>{formatDate(message.createdAt)}</span>
        </div>

        <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-[var(--color-border)] pt-6">
          {message.status !== "read" && (
            <button
              type="button"
              disabled={isUpdating}
              onClick={() =>
                onStatusChange(message._id, "read")
              }
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-strong)] px-4 py-3 text-sm font-medium text-[var(--color-ink)] disabled:opacity-50"
            >
              <Check size={15} />
              Mark read
            </button>
          )}

          {message.status !== "replied" && (
            <button
              type="button"
              disabled={isUpdating}
              onClick={() =>
                onStatusChange(message._id, "replied")
              }
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-ink)] px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              <Reply size={15} />
              Mark replied
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(message)}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminContactPage;
