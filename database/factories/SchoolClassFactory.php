<?php

namespace Database\Factories;

use App\Models\SchoolClass;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SchoolClass>
 */
class SchoolClassFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\SchoolClass>
     */
    protected $model = SchoolClass::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gradeLevel = random_int(1, 12);
        $section = $this->faker->randomElement(['A', 'B', 'C', 'D']);
        
        return [
            'name' => "Grade {$gradeLevel}{$section}",
            'section' => $section,
            'grade_level' => $gradeLevel,
            'description' => $this->faker->optional()->sentence(),
        ];
    }
}