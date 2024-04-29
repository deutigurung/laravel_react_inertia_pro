<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

/**
 * @OA\Schema(
 *      title="Store Project request",
 *      description="Store Project request body data",
 *      type="object",
 *      required={"name","status","due_date"}
 * )
 */
class StoreProjectRequest extends FormRequest
{

    /**
     * @OA\Property(
     *      title="name",
     *      description="Name of the new project",
     *      example="A nice project"
     * )
     *
     * @var string
     */
    public $name;

    /**
     * @OA\Property(
     *      title="description",
     *      description="Description of the new project",
     *      example="This is new project's description"
     * )
     *
     * @var string
     */
    public $description;

    /**
     * @OA\Property(
     *      title="status",
     *      description="status of the new project",
     *      example="pending"
     * )
     *
     * @var string
     */
    public $status;

    /**
     * @OA\Property(
     *      title="due_date",
     *      description="deadline date of the new project",
     *      example="2024-01-01"
     * )
     *
     * @var date
     */
    public $due_date;

    /**
     * @OA\Property(
     *      title="image",
     *      description="image of the new project",
     * )
     *
     * @var file
     */
    public $image;

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
            'image' => ['nullable',File::image()],
        ];
    }
}
