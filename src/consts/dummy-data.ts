export interface UserData {
  rank: string;
  name: string;
  connections: number;
  points: number;
  estimate: string;
}

export interface Question {
  question: string;
  options: string[];
}

export interface LeaderboardData {
  rank: string;
  name: string;
  connections: number;
  points: number;
  estimate: string;
}

export const userData : UserData = {
    rank: "#44",
    name: "Myself",
    connections: 3,
    points: 3,
    estimate: "~300 PNK",
}

export const question : Question ={
  question: "What's the most common method people use to store their cryptocurrency?",
  options: ["Digital Wallet", "Hardware Wallet", "Paper Wallet", "Exchange Wallet", "Mobile Wallet"],
}

export const leaderboardData : LeaderboardData[] = [ {
    rank: "#1",
    name: "Bob",
    connections: 44,
    points: 44,
    estimate: "~440 PNK",
  },
  {
    rank: "#2",
    name: "Alice",
    connections: 42,
    points: 42,
    estimate: "~420 PNK",
  },
  {
    rank: "#2",
    name: "Alice",
    connections: 42,
    points: 42,
    estimate: "~420 PNK",
  },
  {
    rank: "#3",
    name: "John",
    connections: 39,
    points: 39,
    estimate: "~390 PNK",
  },
  {
    rank: "#4",
    name: "Susan",
    connections: 38,
    points: 38,
    estimate: "~380 PNK",
  },
  {
    rank: "#5",
    name: "Claire",
    connections: 24,
    points: 24,
    estimate: "~240 PNK",
  },
  {
    rank: "#6",
    name: "Gary",
    connections: 12,
    points: 12,
    estimate: "~120 PNK",
  },
  {
    rank: "#7",
    name: "Clark",
    connections: 12,
    points: 12,
    estimate: "~120 PNK",
  },
  {
    rank: "#8",
    name: "Joe",
    connections: 11,
    points: 11,
    estimate: "~110 PNK",
  },
  {
    rank: "#9",
    name: "Anna",
    connections: 10,
    points: 10,
    estimate: "~100 PNK",
  },
  {
    rank: "#10",
    name: "Bill",
    connections: 8,
    points: 8,
    estimate: "~80 PNK",
  },];