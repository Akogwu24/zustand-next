import NewTodoDialog from './NewTodoDialog'
import Column from './column'

export default function Columns() {
  return (
    <div className=''>
      <NewTodoDialog />
      <section className='mt-10 flex flex-col gap-6 md:flex-row lg:gap-12'>
        <Column title='Todo' status='TODO' />
        <Column title='In Progress' status='IN_PROGRESS' />
        <Column title='Done' status='DONE' />
      </section>
    </div>
  )
}
