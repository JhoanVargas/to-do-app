export interface Task {
  id: string;
  title: string;
  description?: string;
  category: { id: string; name: string };
  completed: boolean;
}
