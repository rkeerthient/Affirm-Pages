import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Ce_article from "../../types/articles";
import { Image } from "@yext/pages/components";

const ArticleCard = ({ result }: CardProps<Ce_article>) => {
  const article = result.rawData;

  return (
    <div className="flex flex-col">
      {article.c_articlePhoto && (
        <Image layout="intrinsic" image={article.c_articlePhoto} />
      )}
      <p className="text-red-600 line-clamp-3 text-2xl font-bold">
        {article.name}
      </p>
      <p className="text-gray-500 line-clamp-3">{article.body}</p>
      <a
        className="underline text-gray-900 capitalize"
        href={article.landingPageUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        READ FULL ARTICLE
      </a>
    </div>
  );
};

export { ArticleCard };
