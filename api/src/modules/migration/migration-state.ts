export interface MigrationState {
  createdAt: Date;
  updatedAt: Date;
  lastRun: string;
  migrations: [
    {
      title: string;
      timestamp: number;
    },
  ];
}
