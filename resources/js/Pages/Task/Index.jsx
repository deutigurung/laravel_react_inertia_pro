import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head , Link  } from '@inertiajs/react';
import TasksTable from './TasksTable';


export default function Index({auth, tasks, queryParams = null, success}) {
    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Project</h2>
                    <Link href={route("tasks.create")} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
                    Add Task
                    </Link>
                </div>
            }
        >
            <Head title="Task List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {
                        success && (
                            <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <span class="font-medium">{success}!</span>
                        </div>
                        )
                    }
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable 
                            tasks = { tasks}
                            queryParams={queryParams}
                            ></TasksTable>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}