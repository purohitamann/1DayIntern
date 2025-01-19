export interface GameTask {
  id: string;
  description: string;
  completed: boolean;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  rewards: number;
  timeEstimate: string;
  companyDescription: string;
  tasks: GameTask[];
}

export const defaultGames: Game[] = [
  {
    id: "1",
    title: "Code Breaker",
    description: "Solve coding puzzles to unlock achievements",
    difficulty: "Medium",
    rewards: 100,
    timeEstimate: "15-20 mins",
    companyDescription: "TechCorp is a leading software development company specializing in cybersecurity solutions. They are known for their innovative approach to solving complex security challenges.",
    tasks: [
      { id: "1-1", description: "Review the security documentation", completed: false },
      { id: "1-2", description: "Identify potential vulnerabilities", completed: false },
      { id: "1-3", description: "Implement security fixes", completed: false },
      { id: "1-4", description: "Test the security measures", completed: false },
      { id: "1-5", description: "Document your solutions", completed: false }
    ]
  },
  {
    id: "2",
    title: "Debug Master",
    description: "Find and fix bugs in the code",
    difficulty: "Hard",
    rewards: 150,
    timeEstimate: "20-30 mins",
    companyDescription: "BugBusters Inc. is a quality assurance company that helps businesses maintain high-quality software. They specialize in automated testing and debugging solutions.",
    tasks: [
      { id: "2-1", description: "Analyze the error logs", completed: false },
      { id: "2-2", description: "Reproduce the reported bugs", completed: false },
      { id: "2-3", description: "Debug the application", completed: false },
      { id: "2-4", description: "Fix the identified issues", completed: false },
      { id: "2-5", description: "Write test cases", completed: false }
    ]
  },
  {
    id: "3",
    title: "Algorithm Adventure",
    description: "Learn algorithms through interactive challenges",
    difficulty: "Easy",
    rewards: 80,
    timeEstimate: "10-15 mins",
    companyDescription: "AlgoTech Solutions is an educational technology company focused on making algorithm learning fun and interactive. They create innovative learning platforms for students and professionals.",
    tasks: [
      { id: "3-1", description: "Study the algorithm concept", completed: false },
      { id: "3-2", description: "Complete practice exercises", completed: false },
      { id: "3-3", description: "Solve basic algorithm problems", completed: false },
      { id: "3-4", description: "Optimize your solutions", completed: false },
      { id: "3-5", description: "Present your findings", completed: false }
    ]
  }
];
