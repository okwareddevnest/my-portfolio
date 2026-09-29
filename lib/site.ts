// Identity and contact details shared by the shell, metadata and home page.

export const site = {
  studio: "okwaretech",
  owner: "Dedan Okware",
  role: "Senior Software Engineer",
  url: "https://okwaretech.com",
  email: "info@okwaretech.com",
  socials: {
    github: "https://github.com/okwareddevnest",
    linkedin: "https://www.linkedin.com/in/softcysec-dedan-okware/",
    x: "https://x.com/okware_o",
  },
} as const;

// One label for the contact intent everywhere on the site.
export const CONTACT_LABEL = "Start a project";

export const contactHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Project enquiry via okwaretech.com",
)}`;
