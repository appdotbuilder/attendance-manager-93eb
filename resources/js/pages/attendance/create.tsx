import AppLayout from '@/components/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    classes: Array<{
        id: number;
        name: string;
    }>;
    subjects: Array<{
        id: number;
        name: string;
    }>;
    students: Array<{
        id: number;
        first_name: string;
        last_name: string;
        student_id: string;
    }>;
    selectedClass?: number;
    selectedSubject?: number;
    date?: string;
    [key: string]: unknown;
}

interface AttendanceData {
    class_id: string;
    subject_id: string;
    date: string;
    students: Array<{
        student_id: number;
        status: string;
        notes: string;
    }>;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Attendance Records', href: '/attendance' },
    { title: 'Mark Attendance', href: '/attendance/create' },
];

export default function AttendanceCreate({ 
    classes, 
    subjects, 
    students, 
    selectedClass, 
    selectedSubject, 
    date 
}: Props) {
    const [formData, setFormData] = useState<AttendanceData>({
        class_id: selectedClass?.toString() || '',
        subject_id: selectedSubject?.toString() || '',
        date: date || new Date().toISOString().split('T')[0],
        students: students.map(student => ({
            student_id: student.id,
            status: 'present',
            notes: ''
        }))
    });
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const loadStudents = () => {
        if (formData.class_id && formData.subject_id) {
            const params = new URLSearchParams({
                class_id: formData.class_id,
                subject_id: formData.subject_id,
                date: formData.date
            });
            router.get(`/attendance/create?${params.toString()}`);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post('/attendance', formData as Record<string, string | Array<{ student_id: number; status: string; notes: string }>>, {
            preserveScroll: true,
            onSuccess: () => {
                // Redirect handled by controller
            },
            onError: (errors: Record<string, string>) => {
                setErrors(errors);
                setProcessing(false);
            },
            onFinish: () => {
                setProcessing(false);
            }
        });
    };

    const updateStudentStatus = (studentIndex: number, status: string) => {
        const updatedStudents = [...formData.students];
        updatedStudents[studentIndex].status = status;
        setFormData({ ...formData, students: updatedStudents });
    };

    const updateStudentNotes = (studentIndex: number, notes: string) => {
        const updatedStudents = [...formData.students];
        updatedStudents[studentIndex].notes = notes;
        setFormData({ ...formData, students: updatedStudents });
    };

    const markAllPresent = () => {
        const updatedStudents = formData.students.map(student => ({
            ...student,
            status: 'present'
        }));
        setFormData({ ...formData, students: updatedStudents });
    };

    const markAllAbsent = () => {
        const updatedStudents = formData.students.map(student => ({
            ...student,
            status: 'absent'
        }));
        setFormData({ ...formData, students: updatedStudents });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mark Attendance" />
            
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Mark Attendance</h1>
                    <p className="text-gray-600 dark:text-gray-400">Record attendance for students in your class</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Class, Subject, and Date Selection */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Session Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Class *
                                </label>
                                <select
                                    value={formData.class_id}
                                    onChange={(e) => setFormData({ ...formData, class_id: e.target.value })}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                >
                                    <option value="">Select Class</option>
                                    {classes.map((cls) => (
                                        <option key={cls.id} value={cls.id}>
                                            {cls.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.class_id && <p className="mt-1 text-sm text-red-600">{errors.class_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Subject *
                                </label>
                                <select
                                    value={formData.subject_id}
                                    onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map((subject) => (
                                        <option key={subject.id} value={subject.id}>
                                            {subject.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.subject_id && <p className="mt-1 text-sm text-red-600">{errors.subject_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                            </div>
                        </div>

                        {(!formData.class_id || !formData.subject_id) && (
                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={loadStudents}
                                    disabled={!formData.class_id || !formData.subject_id}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Load Students
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Students List */}
                    {students.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Student Attendance ({students.length} students)
                                </h3>
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={markAllPresent}
                                        className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                                    >
                                        ✅ All Present
                                    </button>
                                    <button
                                        type="button"
                                        onClick={markAllAbsent}
                                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                                    >
                                        ❌ All Absent
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {students.map((student, index) => (
                                    <div key={student.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h4 className="font-medium text-gray-900 dark:text-white">
                                                    {student.first_name} {student.last_name}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    ID: {student.student_id}
                                                </p>
                                            </div>
                                            <div className="flex space-x-2">
                                                {['present', 'absent', 'late', 'excused'].map((status) => (
                                                    <button
                                                        key={status}
                                                        type="button"
                                                        onClick={() => updateStudentStatus(index, status)}
                                                        className={`px-3 py-1 text-xs rounded-full border ${
                                                            formData.students[index]?.status === status
                                                                ? status === 'present'
                                                                    ? 'bg-green-100 text-green-800 border-green-300'
                                                                    : status === 'absent'
                                                                    ? 'bg-red-100 text-red-800 border-red-300'
                                                                    : status === 'late'
                                                                    ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                                                    : 'bg-blue-100 text-blue-800 border-blue-300'
                                                                : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                                                        }`}
                                                    >
                                                        {status === 'present' && '✅'} 
                                                        {status === 'absent' && '❌'} 
                                                        {status === 'late' && '⏰'} 
                                                        {status === 'excused' && '📋'} 
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Notes (optional)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Add a note..."
                                                value={formData.students[index]?.notes || ''}
                                                onChange={(e) => updateStudentNotes(index, e.target.value)}
                                                className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {errors.students && <p className="mt-2 text-sm text-red-600">{errors.students}</p>}
                        </div>
                    )}

                    {/* Submit Button */}
                    {students.length > 0 && (
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {processing ? '⏳ Saving...' : '💾 Save Attendance'}
                            </button>
                        </div>
                    )}
                </form>

                {students.length === 0 && formData.class_id && formData.subject_id && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No students found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            No active students found for the selected class and subject combination.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}