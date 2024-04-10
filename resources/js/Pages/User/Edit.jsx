import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({auth, user}) {
    // console.log('user',user)
    /*Note: HTML Form which has file upload, use post route with method PUT because 
    using PUT/PATCH in inertia create new form request 
     with empty data and also not supported by inertia*/
    const { data, setData , put, processing, errors, reset} = useForm({
        name: user.name || '',
        email: user.email || '',
        password: user.password || '',
        password_confirmation: user.password_confirmation || '',

    });

    const handleSubmitForm = (e) => {
        e.preventDefault();
        put(route("users.update",user.id))
        reset()
    }

    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit User</h2>}
        >
            <Head title="Edit User" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmitForm} className="max-w-md mx-auto">
                                <div>
                                    <InputLabel htmlFor="name" value="User Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}>
                                    </TextInput>
                                    <InputError message={errors.name} className="mt-2">
                                    </InputError>
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="User Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="email"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}>
                                    </TextInput>
                                    <InputError message={errors.email} className="mt-2">
                                    </InputError>
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="password" value="User password" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="password"
                                        isFocused={true}
                                        onChange={(e) => setData('password', e.target.value)}>
                                    </TextInput>
                                    <InputError message={errors.password} className="mt-2">
                                    </InputError>
                                </div>

                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirm password" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="password_confirmation"
                                        isFocused={true}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}>
                                    </TextInput>
                                    <InputError message={errors.password_confirmation} className="mt-2">
                                    </InputError>
                                </div>
                               

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Save
                                    </PrimaryButton>
                                </div>
                                
                                
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}