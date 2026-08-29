import { useState } from "react";
import { Mail, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { useAdminContactMessages } from "../../features/contact/hook/useAdminContactMessages";
import {
  updateContactMessageStatus,
  deleteContactMessage,
} from "../../features/contact/contact.admin.service";

function AdminMessagesPage() {
  const queryClient = useQueryClient();

  const {
    data: messages = [],
    isLoading,
    isError,
    error,
  } = useAdminContactMessages();

  const [isUpdating, setIsUpdating] = useState(null);

  async function handleStatusChange(id, status) {
    try {
      setIsUpdating(id);

      await updateContactMessageStatus(id, status);

      await queryClient.invalidateQueries({
        queryKey: ["admin", "contact-messages"],
      });
    } catch (error) {
      window.alert(
        error.response?.data?.message ||
          "Unable to update message status.",
      );
    } finally {
      setIsUpdating(null);
    }
  }

  async function handleDelete(message) {
    const confirmed = window.confirm(
      `Delete the message from "${message.name}"? This cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setIsUpdating(message._id);

      await deleteContactMessage(message._id);

      await queryClient.invalidateQueries({
        queryKey: ["admin", "contact-messages"],
      });
    } catch (error) {
      window.alert(
        error.response?.data?.message ||
          "Unable to delete message.",
      );
    } finally {
      setIsUpdating(null);
    }
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
            "Unable to load messages."}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeading />

      {messages.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[var(--color-border)] p-8">
          <div className="flex items-center gap-3">
            <Mail
              size={20}
              className="text-[var(--color-ink-muted)]"
            />

            <p className="text-sm text-[var(--color-ink-muted)]">
              No messages yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {messages.map((message) => (
            <article
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
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                      {message.name}
                    </h2>

                    <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs font-medium text-[var(--color-ink-muted)]">
                      {message.status}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                    {message.email}
                  </p>

                  <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-[var(--color-ink)]">
                    {message.message}
                  </p>

                  <p className="mt-5 text-xs text-[var(--color-ink-muted)]">
                    {formatDate(message.createdAt)}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <select
                    value={message.status}
                    disabled={isUpdating === message._id}
                    onChange={(event) =>
                      handleStatusChange(
                        message._id,
                        event.target.value,
                      )
                    }
                    className="
                      rounded-lg
                      border
                      border-[var(--color-border-strong)]
                      bg-transparent
                      px-3
                      py-2
                      text-sm
                      text-[var(--color-ink)]
                      outline-none
                    "
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>

                  <button
                    type="button"
                    disabled={isUpdating === message._id}
                    onClick={() => handleDelete(message)}
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
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                    aria-label={`Delete message from ${message.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
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
        Messages
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
        Contact messages.
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-ink-muted)]">
        View and manage messages submitted through your
        portfolio contact form.
      </p>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "";

  return new Date(value).toLocaleString();
}

export default AdminMessagesPage;
