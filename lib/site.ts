// Identity and contact details shared by the shell, metadata and home page.

export const site = {
  studio: "okwaretech",
  owner: "Dedan Okware",
  role: "Senior Software Engineer",
  url: "https://okwaretech.com",
  email: "info@okwaretech.com",
  whatsapp: "+254704860552",
  location: "Nairobi, Kenya",
  socials: {
    github: "https://github.com/okwareddevnest",
    linkedin: "https://www.linkedin.com/in/softcysec-dedan-okware/",
    x: "https://x.com/okware_o",
  },
} as const;

// One label for the contact intent everywhere on the site.
export const CONTACT_LABEL = "Start a project";

// Every "Start a project" button leads to the contact page, which offers WhatsApp and email.
export const contactHref = "/contact";

export const emailHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Project enquiry via okwaretech.com",
)}`;

// wa.me takes the number as digits only, without the leading "+".
export const whatsappHref = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi Dedan, I found you on okwaretech.com and would like to talk about a project.",
)}`;
