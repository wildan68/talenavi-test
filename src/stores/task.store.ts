import type { IMockResponse } from '@/types/mock.type'
import dayjs from 'dayjs'

export const useTaskStore = defineStore('tasks', {
  state: (): {
    tasks: IMockResponse[],
    filteredTasks: IMockResponse[]
    developers: string[]
  } => ({
    tasks: [],
    filteredTasks: [],
    developers: []
  }),
  actions: {
    setTasks(tasks: IMockResponse[]) {
      this.tasks = tasks
      const allDeveloper = tasks.map((task) => task.developer.split(', ')).flat().filter((value, index, self) => self.indexOf(value) === index)
      this.developers = allDeveloper
    },
    isActiveFiltered() {
      return this.filteredTasks.length > 0
    },
    searchTask(title: string) {
      this.filteredTasks =  this.tasks.filter((task) => task.title.toLowerCase().includes(title.toLowerCase()))
    },
    addTask(task: Partial<IMockResponse>) {
      this.tasks = [task as IMockResponse, ...this.tasks]
    },
    editTask(index: number, task: Partial<IMockResponse>) {
      if (this.isActiveFiltered()) {
        this.filteredTasks = [...this.filteredTasks.slice(0, index), task as IMockResponse, ...this.filteredTasks.slice(index + 1)]
        return
      }
      
      this.tasks = [...this.tasks.slice(0, index), task as IMockResponse, ...this.tasks.slice(index + 1)]
    },
    filterByDeveloper(developer: string[]) {
      if (this.isActiveFiltered()) {
        this.filteredTasks = this.filteredTasks.filter((task) => task.developer.split(', ').some((person) => developer.includes(person)))
        return
      }
      this.filteredTasks = this.tasks.filter((task) => task.developer.split(', ').some((person) => developer.includes(person)))
    },
    sortByAscNumber(column: keyof IMockResponse) {
      if (!['Estimated SP', 'Actual SP'].includes(column as string)) return

      if (this.isActiveFiltered()) {
        this.filteredTasks = this.filteredTasks.sort((a, b) => (a[column] as number) - (b[column] as number))
        return
      }

      this.filteredTasks = this.tasks.sort((a, b) => (a[column] as number) - (b[column] as number))
    },
    sortByDescNumber(column: keyof IMockResponse) {
      if (!['Estimated SP', 'Actual SP'].includes(column as string)) return

      if (this.isActiveFiltered()) {
        this.filteredTasks = this.filteredTasks.sort((a, b) => (b[column] as number) - (a[column] as number))
        return
      }

      this.filteredTasks = this.tasks.sort((a, b) => (b[column] as number) - (a[column] as number))
    },
    sortByAscending(column: keyof IMockResponse) {
      if (this.isActiveFiltered()) {
        this.filteredTasks = this.filteredTasks.sort((a, b) => (a[column] as string).localeCompare(b[column] as string))
        return
      }

      this.filteredTasks = this.tasks.sort((a, b) => (a[column] as string).localeCompare(b[column] as string))
    },
    sortByDescending(column: keyof IMockResponse) {
      if (this.isActiveFiltered()) {
        this.filteredTasks = this.filteredTasks.sort((a, b) => (b[column] as string).localeCompare(a[column] as string))
        return
      }
      this.filteredTasks = this.tasks.sort((a, b) => (b[column] as string).localeCompare(a[column] as string))
    },
    sortByAscDate(column: keyof IMockResponse) {
      if (this.isActiveFiltered()) {
        this.filteredTasks = this.filteredTasks.sort((a, b) => dayjs(a[column]).unix() - dayjs(b[column]).unix())
        return
      }
      this.filteredTasks = this.tasks.sort((a, b) => dayjs(a[column]).unix() - dayjs(b[column]).unix())
    },
    sortByDescDate(column: keyof IMockResponse) {
      if (this.isActiveFiltered()) {
        this.filteredTasks = this.filteredTasks.sort((a, b) => dayjs(b[column]).unix() - dayjs(a[column]).unix())
        return
      }
      this.filteredTasks = this.tasks.sort((a, b) => dayjs(b[column]).unix() - dayjs(a[column]).unix())
    },
    legendsCount(data: Record<string, string>, type: string) {
      const status = Object.keys(data)
      
      if (this.isActiveFiltered()) {
        const allStatus = status.reduce((acc, key) => {
          acc[key] = this.filteredTasks.filter((task) => task[type] === key).length
          return acc
        }, {} as Record<string, number>)

        return Object.entries(allStatus).map(([key, value]) => ({ label: key, count: value, color: data[key as keyof typeof data] }))
      }
      
      const allStatus = status.reduce((acc, key) => {
        acc[key] = this.tasks.filter((task) => task[type] === key).length
        return acc
      }, {} as Record<string, number>)

      return Object.entries(allStatus).map(([key, value]) => ({ label: key, count: value, color: data[key as keyof typeof data] }))
    },
    sumEstimatedSp() {
      if (this.isActiveFiltered()) {
        return this.filteredTasks.reduce((acc, task) => acc + (task['Estimated SP'] as number), 0)
      }

      return this.tasks.reduce((acc, task) => acc + (task['Estimated SP'] as number), 0)
    },
    sumActualSp() {
      if (this.isActiveFiltered()) {
        return this.filteredTasks.reduce((acc, task) => acc + (task['Actual SP'] as number), 0)
      }

      return this.tasks.reduce((acc, task) => acc + (task['Actual SP'] as number), 0)
    }
  }
})