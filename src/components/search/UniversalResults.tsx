import * as React from "react";
import {
  SectionProps,
  StandardCard,
  UniversalResults as UR,
} from "@yext/search-ui-react";
import { CategoryCard } from "../cards/CategoryCard";
import { ProductCard } from "../cards/ProductCard";
import { ArticleCard } from "../cards/ArticleCard";
import { CardProps } from "@yext/search-ui-react";

const ProductSection = ({
  results,
  verticalKey,
  CardComponent,
}: SectionProps) => {
  const Card = CardComponent || StandardCard;

  return (
    <>
      <SectionHeader title={verticalKey.toUpperCase()} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {results.map((result) => (
          <Card key={result.id} result={result} />
        ))}
      </div>
    </>
  );
};

const ArticleSection = ({
  results,
  verticalKey,
  CardComponent,
}: SectionProps) => {
  const Card = CardComponent || StandardCard;

  return (
    <>
      <SectionHeader title={verticalKey.toUpperCase()} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {results.map((result) => (
          <Card key={result.id} result={result} />
        ))}
      </div>
    </>
  );
};

const CategorySection = ({
  results,
  verticalKey,
  CardComponent,
}: SectionProps) => {
  const Card = CardComponent || StandardCard;

  return (
    <>
      <SectionHeader title={verticalKey.toUpperCase()} />
      <div className="grid grid-cols-1">
        {results.map((result) => (
          <Card key={result.id} result={result} />
        ))}
      </div>
    </>
  );
};
const ProdCategory_Section = ({
  results,
  verticalKey,
  CardComponent,
}: SectionProps) => {
  const Card = CardComponent || StandardCard;

  return (
    <>
      <SectionHeader title={verticalKey.toUpperCase()} />
      <div className="grid grid-cols-1">
        {results.map((result) => (
          <Card key={result.id} result={result} />
        ))}
      </div>
    </>
  );
};
const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
};

const IconsCard = ({ result }: CardProps<any>) => {
  const category = result.rawData;

  return (
    <div className="border">
      <div className="text-sm">{category.name}</div>
    </div>
  );
};
export const universalResultsConfig = {
  products: {
    CardComponent: ProductCard,
    SectionComponent: ProductSection,
    label: <SectionHeader title="PRODUCTS" />,
  },
  api_products: {
    CardComponent: ProductCard,
    SectionComponent: ProductSection,
    label: <SectionHeader title="PRODUCTS(API)" />,
  },
  articles: {
    CardComponent: ArticleCard,
    SectionComponent: ArticleSection,
    label: <SectionHeader title="ARTICLES" />,
  },
  categories: {
    CardComponent: CategoryCard,
    SectionComponent: CategorySection,
    label: <SectionHeader title="CATEGORIES" />,
  },
  product_category: {
    CardComponent: IconsCard,
    SectionComponent: ProdCategory_Section,
    label: <SectionHeader title="CATEGORIES" />,
  },
};

const UniversalResults = () => {
  return (
    <div className="max-w-7xl p-4 mx-auto">
      <UR verticalConfigMap={universalResultsConfig} />
    </div>
  );
};

export { UniversalResults };
