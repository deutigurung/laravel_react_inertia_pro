<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:projects,name',
            'description' => ['nullable','string'],
            'due_date' => ['required','date'],
            'status' => ['required',Rule::in(['pending','in_progress','complete'])],
            'priority' => ['required',Rule::in(['low','medium','high'])],
            'image' => ['nullable',File::image()],
            'project' => ['required','exists:projects,id'],
            'assigned_user' => ['required','exists:users,id'],
        ];
    }
}
