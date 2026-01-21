
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface StainSolution {
  ingredient: string;
  action: string;
}

export interface GeminiStainResponse {
  summary: string;
  difficulty: 'low' | 'medium' | 'high';
  steps: string[];
  warning?: string;
}
