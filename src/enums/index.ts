export enum EStatusColor {
  'In Progress' = '!bg-blue-500',
  'Ready to start' = '!bg-cyan-500',
  'Waiting for review' = '!bg-yellow-500',
  'Done' = '!bg-green-500',
  'Stuck' = '!bg-indigo-500',
  'Pending Deploy' = '!bg-red-500',
}

export enum EPriority {
  'Low' = '!bg-green-500',
  'Medium' = '!bg-yellow-500',
  'High' = '!bg-red-500',
  'Critical' = '!bg-indigo-500',
  'Best Effort' = '!bg-cyan-500',
}

export enum EType {
  'Feature Enhancements' = '!bg-blue-500',
  'Bug' = '!bg-red-500',
  'Other' = '!bg-green-500',
}