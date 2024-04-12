import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm  } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextAreaInput from '@/Components/TextAreaInput';
import SelectInput from "@/Components/SelectInput";

export default function Create({auth, projects, users}){
    // console.log(projects,users)
    const {data,setData, post, processing, errors,reset} = useForm({
        name: '',
        description: '',
        due_date: '',
        priority: '',
        status: '',
        image: '',
        project:'',
        assigned_user: ''
    });

    const handleSubmitForm = (e) => {
        e.preventDefault();
        post(route("tasks.store"))
        reset()
    }
    return (
        <AuthenticatedLayout
            user = {auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>}
        >
            <Head title="Task Create" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        <form onSubmit={handleSubmitForm} className="max-w-md mx-auto">
                                <div>
                                    <InputLabel htmlFor="name" value="Task Name" />
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
                                    <InputLabel htmlFor="due_date" value="Task Deadline" />
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
                                    <InputLabel htmlFor="priority" value="Priority" />
                                    <SelectInput 
                                        onChange={(e) => setData('priority', e.target.value)}
                                        name="priority" className="mt-1 block w-full"
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>

                                    </SelectInput>
                                    <InputError message={errors.priority} className="mt-2">
                                    </InputError>
                                </div>

                                <div>
                                    <InputLabel htmlFor="project" value="Project Name" />
                                    <SelectInput 
                                        onChange={(e) => setData('project', e.target.value)}
                                        name="project" className="mt-1 block w-full"
                                    >
                                        <option value="">Select Project</option>
                                        {
                                            projects.data.length > 0 && projects.data.map((project)=> (
                                                <option value={project.id} key={project.id}>{project.name}</option>
                                            ))
                                        }

                                    </SelectInput>
                                    <InputError message={errors.project} className="mt-2">
                                    </InputError>
                                </div>

                                <div>
                                    <InputLabel htmlFor="Assigned To" value="Assigned To" />
                                    <SelectInput 
                                        onChange={(e) => setData('assigned_user', e.target.value)}
                                        name="assigned_user" className="mt-1 block w-full"
                                    >
                                        <option value="">Select User</option>
                                        {
                                            users.data.length > 0 && users.data.map((user)=> (
                                                <option value={user.id} key={user.id}>{user.name}</option>
                                            ))
                                        }
                                    </SelectInput>
                                    <InputError message={errors.assigned_user} className="mt-2">
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