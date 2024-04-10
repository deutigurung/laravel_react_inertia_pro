import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head , Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';


export default function Index({auth, users, queryParams = null, success}) {
    // console.log('users', users)
    queryParams = queryParams || {}; //get url params
    const searchFieldChanged = (name,value) => {
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }
        router.get(route("users.index"),queryParams) //redirect to user index url with parameters
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
        router.get(route("users.index"),queryParams)
    }

    const deleteUser = (user) => {
        if(!window.confirm("Are you sure you want to delete this user?")) return;
        router.delete(route("users.destroy",user.id));
    }
    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">User</h2>
                    <Link href={route("users.create")} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
                    Add User
                    </Link>
                </div>
            }
        >
            <Head title="User List" />

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
                            {/* <pre>{JSON.stringify(users,undefined,2)}</pre> */}
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
                                                Name
                                                <a
                                                onClick = { e => sortChanged('name')} 
                                                href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                </svg></a>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">
                                                    Email
                                                    <a 
                                                    onClick = { e => sortChanged('email')} 
                                                    href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                    </svg></a>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Created Date
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
                                                <div>
                                                    <TextInput
                                                    defaultValue = {queryParams.name}
                                                    onBlur = {(e) => searchFieldChanged('name',e.target.value)} 
                                                    onKeyPress = {(e) => onKeyPress('name',e) }
                                                    className="w-full input"
                                                    placeholder="User Name"
                                                    >
                                                    </TextInput>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <div>
                                                    <TextInput
                                                    defaultValue = {queryParams.email}
                                                    onBlur = {(e) => searchFieldChanged('email',e.target.value)} 
                                                    onKeyPress = {(e) => onKeyPress('email',e) }
                                                    className="w-full input"
                                                    placeholder="User Email"
                                                    >
                                                    </TextInput>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.length > 0 && users.data.map((user, index) => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {user.id}
                                                </th>
                                                <td className="px-6 py-4 hover:underline">
                                                    <Link href={route("users.show",user.id)}>
                                                        {user.name}
                                                    </Link>
                                                    
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.created_at}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link href={route('users.edit',user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>/
                                                    <button 
                                                    onClick={(e) => deleteUser(user)}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                                </td>
                                            </tr>
                                        ))}
                                        
                                    </tbody>
                                </table>
                                
                                <Pagination links={users.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}