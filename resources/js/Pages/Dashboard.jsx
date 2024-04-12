import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head , Link} from '@inertiajs/react';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP ,TASK_PRIORITY_CLASS_MAP,TASK_PRIORITY_TEXT_MAP } from '@/constant';


export default function Dashboard({ auth , totalPendingTasks,myPendingTasks,totalProgressTasks,myProgressTasks,
totalCompletedTasks,myCompletedTasks,latestTasks }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-amber-500 text-xl font-semibold">
                            Pending Tasks 
                            </h3>
                            <p className="mt-1">
                                <span className="mr-2">{myPendingTasks}</span> / <span className="ml-2"> {totalPendingTasks} </span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-blue-500 text-xl font-semibold">
                            In Progress Tasks 
                            </h3>
                            <p className="mt-1">
                                <span className="mr-2">{myProgressTasks}</span> / <span className="ml-2"> {totalProgressTasks} </span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-green-500 text-xl font-semibold">
                            Completed Tasks 
                            </h3>
                            <p className="mt-1">
                                <span className="mr-2">{myCompletedTasks}</span> / <span className="ml-2"> {totalCompletedTasks} </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mt-3 mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-xl mb-2 font-semibold">Latest Tasks</h3>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Project name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Task
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Deadline
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Priority
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            latestTasks.data.length > 0 && latestTasks.data.map((task) => (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {task.project.name}
                                                    </th>
                                                    <td className="px-6 py-4  hover:underline">
                                                        <Link href={route("tasks.show",task.id)}>
                                                            {task.name}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {task.due_date}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={"px-2 py-1 rounded text-white " + TASK_PRIORITY_CLASS_MAP[task.priority]}>
                                                            {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

           
        </AuthenticatedLayout>
    );
}
