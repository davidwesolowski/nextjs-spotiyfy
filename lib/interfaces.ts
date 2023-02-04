export interface User {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  playLists: any[];
}

export interface PlayList {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  song: any[]
  userId: string;
  user: User;
}
