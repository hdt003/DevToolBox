export type ToolCategory =
  | 'json'
  | 'encoding'
  | 'security'
  | 'regex'
  | 'time'
  | 'cron'
  | 'sql'
  | 'web'
  | 'networking'
  | 'generators';

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  iconName: string;
}

export interface ToolDefinition {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ToolCategory;
  keywords: string[];
  iconName: string;
  popular?: boolean;
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
}
