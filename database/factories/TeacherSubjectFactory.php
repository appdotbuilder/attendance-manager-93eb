<?php

namespace Database\Factories;

use App\Models\TeacherSubject;
use App\Models\User;
use App\Models\Subject;
use App\Models\SchoolClass;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TeacherSubject>
 */
class TeacherSubjectFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\TeacherSubject>
     */
    protected $model = TeacherSubject::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->state(['role' => 'teacher']),
            'subject_id' => Subject::factory(),
            'class_id' => SchoolClass::factory(),
        ];
    }
}