import Head from 'next/head';

interface MetadataProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export const Metadata = ({
  title,
  description,
  keywords = "software engineer, blockchain developer, web development, ICP, rust, typescript",
  ogImage = "/og-image.png"
}: MetadataProps) => {
  const fullTitle = title.includes('|') ? title : `${title} | Dedan Okware`;
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="author" content="Dedan Okware" />
    </Head>
  );
}; 