import { ArrowUpRight, Shield } from "lucide-react";
import { useProfile } from "../../features/profile/hooks/useProfile";
import { useContent } from "../../features/content/hooks/useContent";
import Container from "./Container";

function Footer() {
  const { data: profile } = useProfile();

  const {
    data: content,
    isLoading: isContentLoading,
    isError: isContentError,
  } = useContent();

  const githubUrl = profile?.socialLinks?.find(
    (link) => link.id === "github",
  )?.url;

  const linkedinUrl = profile?.socialLinks?.find(
    (link) => link.id === "linkedin",
  )?.url;

  const emailUrl = profile?.socialLinks?.find(
    (link) => link.id === "email",
  )?.url;

  const footerContent = content?.footer;

  return (
    <footer className="bg-[var(--color-ink)] text-white">
      <Container>
        <div className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              {isContentLoading ? (
                <div className="space-y-5">
                  <div className="h-3 w-40 animate-pulse rounded-full bg-white/10" />

                  <div className="h-20 w-full max-w-2xl animate-pulse rounded-xl bg-white/10" />
                </div>
              ) : isContentError ? (
                <p className="text-sm text-white/45">
                  Unable to load footer content.
                </p>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                    {footerContent?.eyebrow ||
                      "Let's build something"}
                  </p>

                  <h2 className="mt-5 max-w-2xl whitespace-pre-line text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                    {footerContent?.heading ||
                      "Have an idea?\nLet's talk."}
                  </h2>
                </>
              )}
            </div>

            <a
              href="/#contact"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition-transform duration-200 hover:-translate-y-1"
            >
              {footerContent?.buttonLabel ||
                "Start a conversation"}
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/45">
              © {new Date().getFullYear()}{" "}
              {profile?.name || "Darshan B R"}
            </p>

            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-x-6 gap-y-3"
            >
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  GitHub
                </a>
              )}

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              )}

              {emailUrl && (
                <a
                  href={emailUrl}
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  Email
                </a>
              )}

              <a
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-sm text-white/35 transition-colors hover:text-white/70"
              >
                <Shield size={13} />
                Admin
              </a>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;