export type CurrentWorksapce = {
  name: string;
  id: number;
  isAdmin: boolean;
  joinCode: string;
  channels: Array<{ name: string; id: number }>;
  members: Array<{ name: string; id: number; avatar?: string | null }>;
};
