export type CurrentWorksapce = {
  name: string;
  id: number;
  isAdmin: boolean;
  channels: Array<{ name: string; id: number }>;
};
