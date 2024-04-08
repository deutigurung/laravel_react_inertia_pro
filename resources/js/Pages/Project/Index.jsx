import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head , Link } from '@inertiajs/react';

export default function Index({auth, projects}) {
    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Project</h2>}
        >
            <Head title="Project List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div class="relative h-05 w-05 ...">
                                <div class="right-0 top-0 h-16 w-16 ...">
                                    <a href="" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</a>
                                </div>
                            </div>
                            {/* <pre>{JSON.stringify(projects,undefined,2)}</pre> */}
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                <div class="flex items-center">
                                                    Id
                                                    <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                    </svg></a>
                                                </div>
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Image
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                <div class="flex items-center">
                                                    Status
                                                    <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                    </svg></a>
                                                </div>
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Created Date
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Due Date
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Created By
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                <span class="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.length > 0 && projects.data.map((project, index) => (
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {project.id}
                                                </th>
                                                <td class="px-6 py-4">
                                                    <img src="/docs/images/products/apple-watch.png" class="w-16 md:w-32 max-w-full max-h-full" alt={project.name} />
                                                </td>
                                                <td class="px-6 py-4">
                                                    {project.name}
                                                </td>
                                                <td class="px-6 py-4">
                                                {project.status}
                                                </td>
                                                <td class="px-6 py-4">
                                                {project.created_at}
                                                </td>
                                                <td class="px-6 py-4">
                                                {project.due_date}
                                                </td>
                                                <td class="px-6 py-4">
                                                {project.createdBy.name}
                                                </td>
                                                <td class="px-6 py-4 text-right">
                                                    <Link href={route('projects.edit',project.id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>/
                                                    <Link class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</Link>
                                                </td>
                                            </tr>
                                        ))}
                                        
                                    </tbody>
                                </table>
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}