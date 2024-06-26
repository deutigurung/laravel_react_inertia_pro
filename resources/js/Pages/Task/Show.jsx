import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP , TASK_PRIORITY_CLASS_MAP,TASK_PRIORITY_TEXT_MAP } from "@/constant";
import { Head , Link } from "@inertiajs/react";

export default function Show({auth , task}) {
    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    { `Task - ${task.name}`}
                    </h2>
                    <Link href={route("tasks.edit",task.id)} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800"> 
                    Edit Task
                    </Link>
                </div>
            }
        >
            <Head title={task.name} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img src={task.image} alt="" 
                            className="w-full h-64 object-center"/>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div className="mt-4">
                                    <label htmlFor="id" className="font-bold text-lg">Task Id</label>
                                    <p className="mt-1">{task.id}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="name" className="font-bold text-lg">Task Name</label>
                                    <p className="mt-1">{task.name}</p>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="name" className="font-bold text-lg">Project Name</label>
                                    <p className="mt-1 hover:underline">
                                        <Link href={route("projects.show",task.project.id)}>
                                            {task.project.name}
                                        </Link>
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="name" className="font-bold text-lg">Assigned User</label>
                                    <p className="mt-1">{task.assignedUser.name}</p>
                                </div>
                                
                                <div className="mt-4">
                                    <label htmlFor="due_date" className="font-bold text-lg">Task Due Date</label>
                                    <p className="mt-1">{task.due_date}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="status" className="font-bold text-lg">Task Status</label>
                                    <p className="mt-1">
                                    <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="priority" className="font-bold text-lg">Task Priority</label>
                                    <p className="mt-1">
                                    <span className={"px-2 py-1 rounded text-white " + TASK_PRIORITY_CLASS_MAP[task.priority]}>
                                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                    </span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="created_by" className="font-bold text-lg">Created By</label>
                                    <p className="mt-1">{task.createdBy.name}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="updated_by" className="font-bold text-lg">Updated By</label>
                                    <p className="mt-1">{task.updatedBy.name}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="description" className="font-bold text-lg">Task Description</label>
                                <p className="mt-1">{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}