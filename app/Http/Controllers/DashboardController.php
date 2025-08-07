<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Student;
use App\Models\Subject;
use App\Models\SchoolClass;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();

        if ($user->is_admin) {
            return $this->adminDashboard();
        }

        return $this->teacherDashboard($user);
    }

    /**
     * Admin dashboard data.
     */
    protected function adminDashboard()
    {
        $stats = [
            'total_students' => Student::count(),
            'active_students' => Student::where('status', 'active')->count(),
            'total_teachers' => User::teachers()->count(),
            'total_classes' => SchoolClass::count(),
            'total_subjects' => Subject::count(),
            'todays_attendance' => Attendance::whereDate('date', today())->count(),
            'present_today' => Attendance::whereDate('date', today())->where('status', 'present')->count(),
            'absent_today' => Attendance::whereDate('date', today())->where('status', 'absent')->count(),
        ];

        // Recent attendance records
        $recentAttendances = Attendance::with(['student', 'subject', 'class', 'teacher'])
            ->latest('created_at')
            ->take(10)
            ->get();

        // Class-wise attendance for today
        $classAttendance = SchoolClass::withCount([
            'attendances as present_count' => function ($query) {
                $query->whereDate('date', today())->where('status', 'present');
            },
            'attendances as absent_count' => function ($query) {
                $query->whereDate('date', today())->where('status', 'absent');
            },
            'students as total_students'
        ])->take(10)->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentAttendances' => $recentAttendances,
            'classAttendance' => $classAttendance,
        ]);
    }

    /**
     * Teacher dashboard data.
     */
    protected function teacherDashboard($user)
    {
        // Get teacher's assigned classes and subjects
        $assignedClasses = $user->classes()->count();
        $assignedSubjects = $user->subjects()->count();

        // Today's attendance stats for teacher's classes
        $todaysAttendance = Attendance::where('teacher_id', $user->id)
            ->whereDate('date', today())
            ->count();

        $presentToday = Attendance::where('teacher_id', $user->id)
            ->whereDate('date', today())
            ->where('status', 'present')
            ->count();

        $stats = [
            'assigned_classes' => $assignedClasses,
            'assigned_subjects' => $assignedSubjects,
            'todays_attendance' => $todaysAttendance,
            'present_today' => $presentToday,
            'absent_today' => $todaysAttendance - $presentToday,
        ];

        // Recent attendance records by this teacher
        $recentAttendances = Attendance::where('teacher_id', $user->id)
            ->with(['student', 'subject', 'class'])
            ->latest('created_at')
            ->take(10)
            ->get();

        // Teacher's classes with today's attendance summary
        $myClassesAttendance = $user->classes()->withCount([
            'attendances as present_count' => function ($query) use ($user) {
                $query->whereDate('date', today())
                      ->where('status', 'present')
                      ->where('teacher_id', $user->id);
            },
            'attendances as absent_count' => function ($query) use ($user) {
                $query->whereDate('date', today())
                      ->where('status', 'absent')
                      ->where('teacher_id', $user->id);
            },
            'students as total_students'
        ])->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentAttendances' => $recentAttendances,
            'myClassesAttendance' => $myClassesAttendance,
        ]);
    }
}