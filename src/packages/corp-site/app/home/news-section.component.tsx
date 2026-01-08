"use client";

import NewsCard from "../core/news-card.component";

export default function NewsSection() {
  const newsItems = [
    {
      imageSrc: "/news-1.jpg",
      imageAlt:
        "Cathay Group airplanes - composite view showing multiple aircraft",
      date: "25 November 2025",
      headline: "The Cathay Group releases traffic figures for October 2025",
      href: "#",
    },
    {
      imageSrc: "/news-2.jpg",
      imageAlt:
        "Cathay Cargo Boeing 747 freighter on tarmac with ground crew and loading equipment",
      date: "05 November 2025",
      headline:
        "Cathay Cargo flies in precious artefacts for the Hong Kong Palace Museum's ancient Egypt exhibition",
      href: "#",
    },
    {
      imageSrc: "/news-3.jpg",
      imageAlt: "Cathay Pacific passenger airplane flying over city skyline",
      date: "24 October 2025",
      headline: "The Cathay Group releases traffic figures for September 2025",
      href: "#",
    },
  ];

  return (
    <section className="container bg-white mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-base-content">
        Cathay Cargo news
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {newsItems.map((news, index) => (
          <NewsCard
            key={index}
            imageSrc={news.imageSrc}
            imageAlt={news.imageAlt}
            date={news.date}
            headline={news.headline}
            href={news.href}
          />
        ))}
      </div>
    </section>
  );
}
