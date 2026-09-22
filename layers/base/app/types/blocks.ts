import type { SbBlokData } from "@storyblok/vue";

export enum StoryblokLinkType {
  Url = "url",
  Story = "story",
  Asset = "asset",
  Email = "email",
}

export interface StoryblokLink {
  linktype?: StoryblokLinkType;
  url?: string;
  cached_url?: string;
  target?: string;
}

export interface PageBlok extends SbBlokData {
  body: SbBlokData[];
}

export interface TeaserBlok extends SbBlokData {
  headline: string;
}

export interface GridBlok extends SbBlokData {
  columns: SbBlokData[];
}

export interface FeatureBlok extends SbBlokData {
  name: string;
}

export interface NavLinkBlok extends SbBlokData {
  label: string;
  link: StoryblokLink;
}

export interface NavigationBlok extends SbBlokData {
  links: NavLinkBlok[];
}
