import { create } from 'zustand'
import { v4 } from 'uuid'
import { createJSONStorage, persist } from 'zustand/middleware'

export type TStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'

type TTask = {
  id: string
  title: string
  description?: string
  status: TStatus
}

type TState = {
  tasks: TTask[]
  draggedTask: string | null
}

export type Actions = {
  addTask: (title: string, description?: string) => void
  removeTask: (id: string) => void
  updateTask: (id: string, status: TStatus) => void
  dragTask: (id: string | null) => void
}

export const useTaskStore = create<TState & Actions>()(
  persist(
    set => ({
      tasks: [],
      draggedTask: null,
      addTask: (title: string, description?: string) =>
        set(state => ({
          tasks: [
            ...state.tasks,
            { id: v4(), title, description, status: 'TODO' }
          ]
        })),

      removeTask: (id: string) =>
        set(state => ({ tasks: state.tasks.filter(task => task.id !== id) })),

      updateTask: (id: string, status: TStatus) =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, status } : task
          )
        })),
      dragTask: (id: string | null) => set({ draggedTask: id })
    }),
    {
      skipHydration: true,
      name: 'task-store' // name of the item in the storage (must be unique)
      //   storage: createJSONStorage(() => sessionStorage) // (optional) by default, 'localStorage' is used
    }
  )
)
