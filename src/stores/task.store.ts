import type { IMockResponse } from "@/types/mock.type"

export const useTaskStore = defineStore('task', {
  state: (): {
    tasks: IMockResponse[],
    filteredTasks: IMockResponse[]
  } => ({
    tasks: [],
    filteredTasks: []
  }),
  actions: {
    setTasks(tasks: IMockResponse[]) {
      this.tasks = tasks
    },
    searchTask(title: string) {
      this.filteredTasks = this.tasks.filter((task) => task.title.toLowerCase().includes(title.toLowerCase()))
    },
    addTask(task: Partial<IMockResponse>) {
      this.tasks = [task as IMockResponse, ...this.tasks]
    }
  }
})