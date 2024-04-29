<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

/**
 * @OA\Schema(
 *      title="Update Project request",
 *      description="Update Project request body data",
 *      type="object",
 *      required={"name","status","due_date"}
 * )
 */

class UpdateProjectRequest extends FormRequest
{
    /**
     * @OA\Property(
     *      title="name",
     *      description="Name of the project",
     *      example="A nice project"
     * )
     *
     * @var string
     */
    public $name;

    /**
     * @OA\Property(
     *      title="description",
     *      description="Description of the  project",
     *      example="This is project's description"
     * )
     *
     * @var string
     */
    public $description;

    /**
     * @OA\Property(
     *      title="status",
     *      description="status of the project",
     *      example="pending"
     * )
     *
     * @var string
     */
    public $status;

    /**
     * @OA\Property(
     *      title="due_date",
     *      description="deadline date of the project",
     *      example="2024-01-01"
     * )
     *
     * @var date
     */
    public $due_date;

    /**
     * @OA\Property(
     *      title="image",
     *      description="image of the project",
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
            'name' => 'required|string',
            'description' => ['nullable','string'],
            'due_date' => ['required','date'],
            'status' => ['required',Rule::in(['pending','in_progress','complete'])],
            'image' => ['nullable',File::image()],
        ];
    }
}
