import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";

export default function Show({auth , user }) {
    // console.log('user',user)
    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                { `User - ${user.name}`}
            </h2>}
        >
            <Head title={user.name} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div className="mt-4">
                                    <label htmlFor="id" className="font-bold text-lg">User Id</label>
                                    <p className="mt-1">{user.id}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="name" className="font-bold text-lg">User Name</label>
                                    <p className="mt-1">{user.name}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="email" className="font-bold text-lg">User Email</label>
                                    <p className="mt-1">{user.email}</p>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}