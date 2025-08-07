<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\Student;
use App\Models\Subject;
use App\Models\SchoolClass;
use App\Models\User;
use App\Models\TeacherSubject;
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create subjects
        $subjects = [
            ['name' => 'Mathematics', 'code' => 'MATH101', 'description' => 'Basic Mathematics'],
            ['name' => 'English Language', 'code' => 'ENG101', 'description' => 'English Language and Literature'],
            ['name' => 'Science', 'code' => 'SCI101', 'description' => 'General Science'],
            ['name' => 'History', 'code' => 'HIST101', 'description' => 'World History'],
            ['name' => 'Geography', 'code' => 'GEO101', 'description' => 'Physical and Human Geography'],
        ];

        foreach ($subjects as $subject) {
            Subject::create($subject);
        }

        // Create classes
        $classes = [
            ['name' => 'Grade 9A', 'section' => 'A', 'grade_level' => 9],
            ['name' => 'Grade 9B', 'section' => 'B', 'grade_level' => 9],
            ['name' => 'Grade 10A', 'section' => 'A', 'grade_level' => 10],
            ['name' => 'Grade 10B', 'section' => 'B', 'grade_level' => 10],
            ['name' => 'Grade 11A', 'section' => 'A', 'grade_level' => 11],
        ];

        foreach ($classes as $class) {
            SchoolClass::create($class);
        }

        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@school.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'employee_id' => 'EMP001',
            'phone' => '+1234567890',
            'address' => '123 School Street, Education City',
        ]);

        // Create teacher users
        $teacherNames = [
            'John Smith',
            'Mary Johnson',
            'David Brown',
            'Sarah Davis',
            'Michael Wilson',
        ];

        $teachers = [];
        foreach ($teacherNames as $index => $name) {
            $teacher = User::create([
                'name' => $name,
                'email' => strtolower(str_replace(' ', '.', $name)) . '@school.com',
                'password' => bcrypt('password'),
                'role' => 'teacher',
                'employee_id' => 'TCH' . str_pad((string)($index + 1), 3, '0', STR_PAD_LEFT),
                'phone' => '+123456789' . $index,
                'address' => ($index + 1) . '0' . ($index + 1) . ' Teacher Lane, Education City',
            ]);
            $teachers[] = $teacher;
        }

        // Assign teachers to subjects and classes
        $subjects = Subject::all();
        $classes = SchoolClass::all();
        
        foreach ($teachers as $teacher) {
            // Each teacher gets 2-3 random subjects and classes
            $teacherSubjects = $subjects->random(random_int(2, 3));
            $teacherClasses = $classes->random(random_int(1, 2));
            
            foreach ($teacherSubjects as $subject) {
                foreach ($teacherClasses as $class) {
                    TeacherSubject::create([
                        'user_id' => $teacher->id,
                        'subject_id' => $subject->id,
                        'class_id' => $class->id,
                    ]);
                }
            }
        }

        // Create students
        $students = [];
        foreach ($classes as $class) {
            for ($i = 1; $i <= random_int(20, 30); $i++) {
                $student = Student::create([
                    'student_id' => 'STU' . $class->grade_level . $class->section . str_pad((string)$i, 2, '0', STR_PAD_LEFT),
                    'first_name' => fake()->firstName(),
                    'last_name' => fake()->lastName(),
                    'email' => fake()->optional(0.7)->unique()->safeEmail(),
                    'phone' => fake()->optional(0.5)->phoneNumber(),
                    'date_of_birth' => fake()->dateTimeBetween('-18 years', '-12 years'),
                    'address' => fake()->optional(0.8)->address(),
                    'class_id' => $class->id,
                    'status' => fake()->randomElement(['active', 'active', 'active', 'active', 'inactive']),
                ]);
                $students[] = $student;
            }
        }

        // Create attendance records for the last 30 days
        $teacherSubjects = TeacherSubject::with(['teacher', 'subject', 'class'])->get();
        
        for ($day = 29; $day >= 0; $day--) {
            $date = now()->subDays($day)->toDateString();
            
            foreach ($teacherSubjects as $teacherSubject) {
                $classStudents = Student::where('class_id', $teacherSubject->class_id)
                    ->where('status', 'active')
                    ->get();
                
                foreach ($classStudents as $student) {
                    // 85% chance of having attendance record for each day
                    if (random_int(1, 100) <= 85) {
                        $status = fake()->randomElement([
                            'present', 'present', 'present', 'present', 'present', 'present', 'present',
                            'absent', 'late', 'excused'
                        ]);
                        
                        Attendance::create([
                            'student_id' => $student->id,
                            'subject_id' => $teacherSubject->subject_id,
                            'class_id' => $teacherSubject->class_id,
                            'teacher_id' => $teacherSubject->user_id,
                            'date' => $date,
                            'status' => $status,
                            'notes' => $status === 'absent' ? fake()->optional(0.3)->sentence() : null,
                        ]);
                    }
                }
            }
        }
    }
}