<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'priority' => $this->priority,
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'image' => $this->image,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
            'assignedUser' => $this->assignedUser ? new UserResource($this->assignedUser) : null,
            'project' => new ProjectResource($this->project),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
        ];
    }
}
