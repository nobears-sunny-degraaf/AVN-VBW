import type { SiteConfig } from "#base/types/site";
import type { StoryblokLink } from "#base/types/blocks";
import { StoryblokLinkType } from "#base/types/blocks";

const HOME_SLUG = "home";

const storyblokVersion = () => (import.meta.dev ? "draft" : "published");

export const useSite = (): SiteConfig =>
  useRuntimeConfig().public.site as unknown as SiteConfig;

export const useSiteStory = (slug?: string[]) => {
  const { key } = useSite();
  const path = slug?.length ? slug.join("/") : HOME_SLUG;

  return useAsyncStoryblok(`${key}/${path}`, {
    api: { version: storyblokVersion() },
    bridge: {},
  });
};

export const useSiteNavigation = () => {
  const { key } = useSite();

  return useAsyncStoryblok(`${key}/navigation`, {
    api: { version: storyblokVersion() },
    bridge: {},
  });
};

export const useSiteLink = () => {
  const { key } = useSite();
  const prefix = `${key}/`;

  return (link: StoryblokLink): string => {
    if (link.linktype === StoryblokLinkType.Url) {
      return link.url ?? "/";
    }

    const target = (link.cached_url ?? "").replace(/^\/+|\/+$/g, "");
    const scoped = target.startsWith(prefix) ? target.slice(prefix.length) : target;

    return scoped === "" || scoped === HOME_SLUG ? "/" : `/${scoped}`;
  };
};
