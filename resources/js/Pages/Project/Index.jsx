import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head , Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constant';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';


export default function Index({auth, projects, queryParams = null, success}) {
    // console.log('projects', projects)
    queryParams = queryParams || {}; //get url params
    const searchFieldChanged = (name,value) => {
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }
        router.get(route("projects.index"),queryParams) //redirect to project index url with parameters
    }

    const onKeyPress = (name,e) => {
       if (e.key !== 'Enter') return; 
       searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            }else{
                queryParams.sort_direction = 'asc';
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route("projects.index"),queryParams)
    }
    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Project</h2>
                    <Link href={route("projects.create")} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
                    Add Project
                    </Link>
                </div>
            }
        >
            <Head title="Project List" />

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
                            {/* <pre>{JSON.stringify(projects,undefined,2)}</pre> */}
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">
                                                    Id
                                                    <a
                                                    onClick = { e => sortChanged('id')} 
                                                    href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                    </svg></a>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Image
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                                <a
                                                onClick = { e => sortChanged('name')} 
                                                href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                </svg></a>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">
                                                    Status
                                                    <a 
                                                    onClick = { e => sortChanged('status')} 
                                                    href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                    </svg></a>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Created Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Due Date
                                                <a
                                                onClick = { e => sortChanged('due_date')} 
                                                href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                </svg></a>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Created By
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-nowrap">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">
                                                    
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <div>
                                                    <TextInput
                                                    defaultValue = {queryParams.name}
                                                    onBlur = {(e) => searchFieldChanged('name',e.target.value)} 
                                                    onKeyPress = {(e) => onKeyPress('name',e) }
                                                    className="w-full input"
                                                    placeholder="Project Name"
                                                    >
                                                    </TextInput>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">
                                                    <SelectInput
                                                        defaultValue = {queryParams.status}
                                                        onChange = {(e) => searchFieldChanged('status',e.target.value)}
                                                        className="w-full"
                                                    >
                                                        <option value="">Select Status</option>
                                                        <option value="pending">Pending</option>
                                                        <option value="in_progress">In Progress</option>
                                                        <option value="complete">Completed</option>
                                                    </SelectInput>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <TextInput
                                                    type = "date"
                                                    defaultValue = {queryParams.due_date}
                                                    onChange = {(e) => searchFieldChanged('due_date',e.target.value)}
                                                    className="w-full input"
                                                    placeholder="Project DueDate"
                                                    >
                                                    </TextInput>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.length > 0 && projects.data.map((project, index) => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {project.id}
                                                </th>
                                                <td className="px-6 py-4">
                                                    <img src={project.image} className="w-16 md:w-32 max-w-full max-h-full" alt={project.name} />
                                                </td>
                                                <td className="px-6 py-4 hover:underline">
                                                    <Link href={route("projects.show",project.id)}>
                                                        {project.name}
                                                    </Link>
                                                    
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                {project.created_at}
                                                </td>
                                                <td className="px-6 py-4">
                                                {project.due_date}
                                                </td>
                                                <td className="px-6 py-4">
                                                {project.createdBy.name}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link href={route('projects.edit',project.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>/
                                                    <Link className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</Link>
                                                </td>
                                            </tr>
                                        ))}
                                        
                                    </tbody>
                                </table>
                                
                                <Pagination links={projects.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}