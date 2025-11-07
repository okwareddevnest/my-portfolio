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
  ogImage = "/profile.png"
}: MetadataProps) => {
  const fullTitle = title.includes('|') ? title : `${title} | Dedan Okware`;
  const siteUrl = "https://my-portfolio-crypt.vercel.app";
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
  
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
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="Dedan Okware - Portfolio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@okwareddevnest" />
      <meta name="twitter:creator" content="@okwareddevnest" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="author" content="Dedan Okware" />
    </Head>
  );
}; 