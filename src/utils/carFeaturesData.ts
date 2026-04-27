import type { ElementType } from "react";
import type { Car } from "../types/type";
import {
  Star,
  Cone,
  Armchair,
  Cpu,
  CheckCircle2,
  Ruler,
  Gauge,
  Fuel,
  Settings2,
  Dna,
} from "lucide-react";

export interface FeatureItemData {
  text: string;
  icon: ElementType;
  showInfo?: boolean;
}

export interface FeatureCategoryData {
  id: string;
  title: string;
  mainIcon: ElementType;
  items: FeatureItemData[];
}

const CATEGORY_ICON_MAP: Record<string, ElementType> = {
  HIGHLIGHTS: Star,
  SAFETY: Cone,
  INTERIOR: Armchair,
  TECHNOLOGY: Cpu,
};

const formatCategoryTitle = (category: string) =>
  category
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const getCategoryIcon = (category: string) =>
  CATEGORY_ICON_MAP[category] ?? CheckCircle2;

export const generateCarFeatures = (car: Car): FeatureCategoryData[] => {
  const categories: FeatureCategoryData[] = [];
  const groupedFeatures = new Map<string, string[]>();

  (car.features ?? []).forEach((feature) => {
    const category = feature.category?.trim() || "Other";
    const currentFeatures = groupedFeatures.get(category) ?? [];
    groupedFeatures.set(category, [...currentFeatures, feature.name]);
  });

  categories.push({
    id: "specs",
    title: "Specs",
    mainIcon: Ruler,
    items: [
      { icon: Gauge, text: "1.2L 3-Cylinder Turbo Gas Engine" },
      {
        icon: Fuel,
        text: car.fuelType === "Electric" ? "120 MPGe" : "28 City / 32 Highway",
        showInfo: true,
      },
      { icon: Settings2, text: "6-Speed Automatic Transmission" },
      { icon: Dna, text: `${car.driveType || "Front Wheel"} Drive` },
    ],
  });

  groupedFeatures.forEach((featureNames, category) => {
    if (featureNames.length === 0) return;

    categories.push({
      id: category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: formatCategoryTitle(category),
      mainIcon: getCategoryIcon(category),
      items: featureNames.map((name) => ({
        icon: CheckCircle2,
        text: name,
      })),
    });
  });

  return categories;
};
