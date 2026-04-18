/** User rank determines pricing tier */
export type Rank = string;

export interface IUser {
  id: string;
  name: string;
  email?: string;
  rank?: Rank;
}
