export enum SiteKey {
  Avn = "avn",
  Vbw = "vbw",
}

export interface SiteConfig {
  key: SiteKey;
  label: string;
}
