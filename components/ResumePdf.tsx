import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Fragment } from "react";
import type { ReactNode } from "react";
import type { ResumeCredential, ResumeData } from "../data/resume";

// react-pdf hyphenates by default; a split keyword ("Type-Script") is no
// longer a keyword to an ATS parser, so words are kept whole.
Font.registerHyphenationCallback((word) => [word]);

const INK = "#111827";
const MUTED = "#4b5563";
const ACCENT = "#1e3a8a";

const styles = StyleSheet.create({
  page: {
    paddingVertical: 30,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.35,
    color: INK,
  },
  name: { fontWeight: "bold", fontSize: 18, marginBottom: 3 },
  headline: { fontWeight: "bold", fontSize: 12, color: ACCENT, marginTop: 2 },
  specialties: { fontSize: 9.5, color: MUTED, marginTop: 1 },
  contact: { flexDirection: "row", flexWrap: "wrap", fontSize: 9, color: MUTED, marginTop: 3 },
  // Leading spaces are trimmed per Text, so the gap comes from margins instead.
  separator: { marginHorizontal: 5 },
  section: { marginTop: 8 },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 10.5,
    color: ACCENT,
    borderBottomWidth: 1,
    borderBottomColor: ACCENT,
    paddingBottom: 2,
    marginBottom: 5,
  },
  bold: { fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  credential: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  entry: { marginBottom: 6 },
  entryTitle: { fontWeight: "bold", fontSize: 10 },
  entryMeta: { fontSize: 9, color: MUTED },
  bullet: { flexDirection: "row", marginTop: 1.5, paddingLeft: 4 },
  bulletMark: { width: 10 },
  bulletText: { flex: 1 },
  skillLine: { marginBottom: 2 },
});

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle} minPresenceAhead={40}>
      {title.toUpperCase()}
    </Text>
    {children}
  </View>
);

const Bullets = ({ items }: { items: string[] }) => (
  <>
    {items.map((item) => (
      <View key={item} style={styles.bullet} wrap={false}>
        <Text style={styles.bulletMark}>•</Text>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </>
);

const Credentials = ({ items }: { items: ResumeCredential[] }) => (
  <>
    {items.map((item) => (
      <View key={item.name} style={styles.credential}>
        <Text>
          <Text style={styles.bold}>{item.name}</Text> - {item.issuer}
        </Text>
        <Text style={styles.entryMeta}>{item.date}</Text>
      </View>
    ))}
  </>
);

export const ResumePdf = ({ data }: { data: ResumeData }) => (
  <Document
    title={`${data.name} - ${data.headline} Resume`}
    author={data.name}
    subject={`${data.headline} - ${data.specialties}`}
    keywords={data.skills.flatMap((group) => group.items).join(", ")}
    creator={data.name}
    language="en"
  >
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.headline}>{data.headline}</Text>
        <Text style={styles.specialties}>{data.specialties}</Text>
        {/* One Text per item so a line break never lands inside a URL. */}
        <View style={styles.contact}>
          {data.contact.map((item, index) => (
            <Fragment key={item}>
              {index > 0 && <Text style={styles.separator}>|</Text>}
              <Text>{item}</Text>
            </Fragment>
          ))}
        </View>
      </View>

      <Section title="Professional Summary">
        <Text>{data.summary}</Text>
      </Section>

      <Section title="Technical Skills">
        {data.skills.map((group) => (
          <Text key={group.label} style={styles.skillLine}>
            <Text style={styles.bold}>{group.label}: </Text>
            {group.items.join(", ")}
          </Text>
        ))}
      </Section>

      <Section title="Professional Experience">
        {data.experience.map((role) => (
          <View key={`${role.company}-${role.title}`} style={styles.entry}>
            <View style={styles.row} minPresenceAhead={30}>
              <Text style={styles.entryTitle}>{role.title}</Text>
              <Text style={styles.entryMeta}>{role.period}</Text>
            </View>
            <Text style={styles.entryMeta}>
              {role.company} | {role.location}
            </Text>
            <Bullets items={role.bullets} />
          </View>
        ))}
      </Section>

      <Section title="Projects">
        {data.projects.map((project) => (
          <View key={project.name} style={styles.entry} wrap={false}>
            <Text style={styles.entryTitle}>{project.name}</Text>
            <Text style={styles.entryMeta}>{project.stack}</Text>
            <Bullets items={project.bullets} />
          </View>
        ))}
      </Section>

      <Section title="Awards">
        <Credentials items={data.awards} />
      </Section>

      <Section title="Certifications">
        <Credentials items={data.certifications} />
      </Section>

      <Section title="Education">
        <Text>{data.education}</Text>
      </Section>
    </Page>
  </Document>
);
