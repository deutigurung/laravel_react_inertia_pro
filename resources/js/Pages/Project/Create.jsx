import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextAreaInput from '@/Components/TextAreaInput';
import SelectInput from "@/Components/SelectInput";

export default function Create({auth}) {

    const { data, setData , post, processing, errors, reset} = useForm({
        name: '',
        description: '',
        due_date: '',
        status: '',
        image: ''
    });

    const handleSubmitForm = (e) => {
        e.preventDefault();
        post(route("projects.store"))
        reset()
    }

    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create Project</h2>}
        >
            <Head title="Create Project" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmitForm} className="max-w-md mx-auto">
                                <div>
                                    <InputLabel htmlFor="name" value="Project Name" />
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
                                    <InputLabel htmlFor="description" value="Description" />
                                    <TextAreaInput
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        autoComplete="description"
                                        row="3"
                                        isFocused={true}
                                        onChange={(e) => setData('description', e.target.value)}>
                                    </TextAreaInput>
                                    <InputError message={errors.description} className="mt-2">
                                    </InputError>
                                </div>

                                <div>
                                    <InputLabel htmlFor="due_date" value="Project Deadline" />
                                    <TextInput
                                        id="due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        autoComplete="due_date"
                                        isFocused={true}
                                        onChange={(e) => setData('due_date', e.target.value)}>
                                    </TextInput>
                                    <InputError message={errors.due_date} className="mt-2">
                                    </InputError>
                                </div>

                                <div>
                                    <InputLabel htmlFor="status" value="Status" />
                                    <SelectInput 
                                        onChange={(e) => setData('status', e.target.value)}
                                        name="status" className="mt-1 block w-full"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="complete">Complete</option>

                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2">
                                    </InputError>
                                </div>

                                <div>
                                    <InputLabel htmlFor="image" value="Image" />
                                    <TextInput
                                        id="image"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        autoComplete="image"
                                        isFocused={true}
                                        onChange={(e) => setData('image', e.target.files[0])}>
                                    </TextInput>
                                    <InputError message={errors.image} className="mt-2">
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