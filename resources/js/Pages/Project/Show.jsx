import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constant";
import {Head} from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

export default function Show({auth , project, tasks,queryParams = null}) {
    // console.log('project',project)
    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                { `Project - ${project.name}`}
            </h2>}
        >
            <Head title={project.name} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img src={project.image} alt="" 
                            className="w-full h-64 object-center"/>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div className="mt-4">
                                    <label htmlFor="id" className="font-bold text-lg">Project Id</label>
                                    <p className="mt-1">{project.id}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="name" className="font-bold text-lg">Project Name</label>
                                    <p className="mt-1">{project.name}</p>
                                </div>
                                
                                <div className="mt-4">
                                    <label htmlFor="due_date" className="font-bold text-lg">Project Due Date</label>
                                    <p className="mt-1">{project.due_date}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="status" className="font-bold text-lg">Project Status</label>
                                    <p className="mt-1">
                                    <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                    </span>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="created_by" className="font-bold text-lg">Created By</label>
                                    <p className="mt-1">{project.createdBy.name}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="updated_by" className="font-bold text-lg">Updated By</label>
                                    <p className="mt-1">{project.updatedBy.name}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="description" className="font-bold text-lg">Project Description</label>
                                <p className="mt-1">{project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-5 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable 
                            tasks = { tasks}
                            hideProjectColumn = {true}
                            queryParams={queryParams}
                            ></TasksTable>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}