<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAttendanceRequest;
use App\Http\Requests\UpdateAttendanceRequest;
use App\Models\Attendance;
use App\Models\Student;
use App\Models\Subject;
use App\Models\SchoolClass;
use App\Models\TeacherSubject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = Attendance::with(['student', 'subject', 'class', 'teacher']);

        // If teacher, only show their attendance records
        if ($user->is_teacher) {
            $query->where('teacher_id', $user->id);
        }

        // Filter by date if provided
        if ($request->has('date')) {
            $query->whereDate('date', $request->date);
        }

        // Filter by class if provided
        if ($request->has('class_id')) {
            $query->where('class_id', $request->class_id);
        }

        // Filter by subject if provided
        if ($request->has('subject_id')) {
            $query->where('subject_id', $request->subject_id);
        }

        $attendances = $query->latest('date')->paginate(20);

        // Get filter options
        $classes = $user->is_admin 
            ? SchoolClass::all() 
            : $user->classes()->get();

        $subjects = $user->is_admin 
            ? Subject::all() 
            : $user->subjects()->get();

        return Inertia::render('attendance/index', [
            'attendances' => $attendances,
            'classes' => $classes,
            'subjects' => $subjects,
            'filters' => $request->only(['date', 'class_id', 'subject_id']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = auth()->user();

        // Get teacher's assigned classes and subjects
        $teacherSubjects = $user->is_admin 
            ? TeacherSubject::with(['subject', 'class'])->get()
            : $user->teacherSubjects()->with(['subject', 'class'])->get();

        $classes = $teacherSubjects->pluck('class')->unique('id');
        $subjects = $teacherSubjects->pluck('subject')->unique('id');

        // If class and subject are selected, get students
        $students = [];
        if ($request->has('class_id') && $request->has('subject_id')) {
            $students = Student::where('class_id', $request->class_id)
                ->where('status', 'active')
                ->orderBy('first_name')
                ->get();
        }

        return Inertia::render('attendance/create', [
            'classes' => $classes,
            'subjects' => $subjects,
            'students' => $students,
            'selectedClass' => $request->class_id,
            'selectedSubject' => $request->subject_id,
            'date' => $request->date ?? today()->toDateString(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttendanceRequest $request)
    {
        $validated = $request->validated();
        
        // Bulk create attendance records
        $attendanceData = [];
        foreach ($validated['students'] as $studentData) {
            $attendanceData[] = [
                'student_id' => $studentData['student_id'],
                'subject_id' => $validated['subject_id'],
                'class_id' => $validated['class_id'],
                'teacher_id' => auth()->id(),
                'date' => $validated['date'],
                'status' => $studentData['status'],
                'notes' => $studentData['notes'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Attendance::upsert(
            $attendanceData,
            ['student_id', 'subject_id', 'class_id', 'date'],
            ['status', 'notes', 'teacher_id', 'updated_at']
        );

        return redirect()->route('attendance.index')
            ->with('success', 'Attendance recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        $attendance->load(['student', 'subject', 'class', 'teacher']);

        return Inertia::render('attendance/show', [
            'attendance' => $attendance,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        $attendance->load(['student', 'subject', 'class']);

        return Inertia::render('attendance/edit', [
            'attendance' => $attendance,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttendanceRequest $request, Attendance $attendance)
    {
        $attendance->update($request->validated());

        return redirect()->route('attendance.show', $attendance)
            ->with('success', 'Attendance updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        $attendance->delete();

        return redirect()->route('attendance.index')
            ->with('success', 'Attendance record deleted successfully.');
    }
}