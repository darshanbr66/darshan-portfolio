import ExperienceCard from "../../components/common/ExperienceCard";
import { useExperiences } from "../../features/experience/hook/useExperiences";
import { useContent } from "../../features/content/hooks/useContent";
import Skeleton from "../../components/ui/Skeleton";

function ExperienceSection() {
  const {
    data: experiences = [],
    isLoading: isExperiencesLoading,
    isError: isExperiencesError,
  } = useExperiences();

  const {
    data: content,
    isLoading: isContentLoading,
    isError: isContentError,
  } = useContent();

  const isHeaderLoading =
    isExperiencesLoading || isContentLoading;

  return (
    <section
      id="experience"
      className="border-t border-[var(--color-border)]"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
        {/* Section header */}

        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            {isHeaderLoading ? (
              <div className="space-y-5">
                <Skeleton
                  className="h-3 w-28 rounded-full"
                  variant="text"
                />

                <Skeleton
                  className="h-12 w-64 rounded-lg"
                  variant="heading"
                />
              </div>
            ) : isContentError ? (
              <p className="text-sm text-[var(--color-muted)]">
                Unable to load section content right now.
              </p>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-[var(--color-accent)]" />

                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    {content?.experience?.sectionLabel ||
                      "Experience"}
                  </p>
                </div>

                <h2
                  id="experience-heading"
                  className="
                    mt-6
                    max-w-lg
                    text-4xl
                    font-medium
                    tracking-[-0.04em]
                    text-[var(--color-text)]
                    sm:text-5xl
                  "
                >
                  {content?.experience?.heading ||
                    "Where I've worked."}
                </h2>
              </>
            )}
          </div>

          <div className="lg:pt-8">
            {isHeaderLoading ? (
              <div className="space-y-3">
                <Skeleton
                  className="h-5 w-full max-w-2xl"
                  variant="text"
                />

                <Skeleton
                  className="h-5 w-11/12 max-w-2xl"
                  variant="text"
                />

                <Skeleton
                  className="h-5 w-8/12 max-w-2xl"
                  variant="text"
                />
              </div>
            ) : isContentError ? (
              <p className="text-sm text-[var(--color-muted)]">
                Unable to load section content right now.
              </p>
            ) : (
              content?.experience?.description && (
                <p className="max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
                  {content.experience.description}
                </p>
              )
            )}
          </div>
        </div>

        {/* Experience list */}

        <div className="mt-16 sm:mt-20">
          {isExperiencesLoading && (
            <div className="border-t border-[var(--color-border)] py-8">
              <Skeleton
                className="h-5 w-48"
                variant="text"
              />

              <Skeleton
                className="mt-5 h-8 w-72"
                variant="heading"
              />

              <Skeleton
                className="mt-6 h-4 w-full max-w-xl"
                variant="text"
              />

              <Skeleton
                className="mt-3 h-4 w-11/12 max-w-xl"
                variant="text"
              />

              <Skeleton
                className="mt-3 h-4 w-9/12 max-w-xl"
                variant="text"
              />
            </div>
          )}

          {isExperiencesError && (
            <div className="border-t border-[var(--color-border)] py-8">
              <p className="text-sm text-[var(--color-muted)]">
                Unable to load experience right now.
              </p>
            </div>
          )}

          {!isExperiencesLoading &&
            !isExperiencesError &&
            experiences.length === 0 && (
              <div className="border-t border-[var(--color-border)] py-8">
                <p className="text-sm text-[var(--color-muted)]">
                  No experience available.
                </p>
              </div>
            )}

          {!isExperiencesLoading &&
            !isExperiencesError &&
            experiences.length > 0 && (
              <div>
                {experiences.map((experience) => (
                  <ExperienceCard
                    key={experience._id}
                    company={experience.company}
                    role={experience.role}
                    startDate={experience.startDate}
                    endDate={experience.endDate}
                    location={experience.location}
                    technologies={experience.technologies}
                    description={experience.description}
                    responsibilities={
                      experience.responsibilities
                    }
                  />
                ))}
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;