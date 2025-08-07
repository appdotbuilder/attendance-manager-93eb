<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\SchoolClass;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Student>
     */
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => 'STU' . random_int(1000, 9999),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->optional()->unique()->safeEmail(),
            'phone' => $this->faker->optional()->phoneNumber(),
            'date_of_birth' => $this->faker->date('Y-m-d', '-10 years'),
            'address' => $this->faker->optional()->address(),
            'class_id' => SchoolClass::factory(),
            'status' => $this->faker->randomElement(['active', 'inactive', 'graduated']),
        ];
    }
}