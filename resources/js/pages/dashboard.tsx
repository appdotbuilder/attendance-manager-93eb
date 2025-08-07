import AppLayout from '@/components/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Props {
    stats: {
        total_students?: number;
        active_students?: number;
        total_teachers?: number;
        total_classes?: number;
        total_subjects?: number;
        todays_attendance: number;
        present_today: number;
        absent_today: number;
        assigned_classes?: number;
        assigned_subjects?: number;
    };
    recentAttendances: Array<{
        id: number;
        date: string;
        status: string;
        notes?: string;
        student: {
            id: number;
            first_name: string;
            last_name: string;
        };
        subject: {
            id: number;
            name: string;
        };
        class: {
            id: number;
            name: string;
        };
        teacher?: {
            id: number;
            name: string;
        };
    }>;
    classAttendance?: Array<{
        id: number;
        name: string;
        present_count: number;
        absent_count: number;
        total_students: number;
    }>;
    myClassesAttendance?: Array<{
        id: number;
        name: string;
        present_count: number;
        absent_count: number;
        total_students: number;
    }>;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, recentAttendances, classAttendance, myClassesAttendance }: Props) {
    const isAdmin = stats.total_teachers !== undefined;
    const attendanceRate = stats.todays_attendance > 0 
        ? Math.round((stats.present_today / stats.todays_attendance) * 100) 
        : 0;

    const getStatusBadge = (status: string) => {
        const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
        switch (status) {
            case 'present':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
            case 'absent':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
            case 'late':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`;
            case 'excused':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300`;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Message */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        📚 {isAdmin ? 'Admin Dashboard' : 'Teacher Dashboard'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {isAdmin ? 'Manage your school\'s attendance system' : 'Track attendance for your classes'}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {isAdmin ? (
                        <>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                        <span className="text-2xl">👨‍🎓</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total_students}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                        <span className="text-2xl">👨‍🏫</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Teachers</p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total_teachers}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                        <span className="text-2xl">📚</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Classes</p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total_classes}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                        <span className="text-2xl">📚</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">My Classes</p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.assigned_classes}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                        <span className="text-2xl">📖</span>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">My Subjects</p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.assigned_subjects}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                <span className="text-2xl">✅</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Present Today</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.present_today}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                                <span className="text-2xl">❌</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Absent Today</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.absent_today}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <Link
                        href="/attendance/create"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        📝 Mark Attendance
                    </Link>
                    <Link
                        href="/attendance"
                        className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                        📊 View All Attendance
                    </Link>
                    {isAdmin && (
                        <Link
                            href="/students"
                            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                            👨‍🎓 Manage Students
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Attendance */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Attendance</h3>
                        </div>
                        <div className="p-6">
                            {recentAttendances.length > 0 ? (
                                <div className="space-y-4">
                                    {recentAttendances.slice(0, 5).map((attendance) => (
                                        <div key={attendance.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {attendance.student.first_name} {attendance.student.last_name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {attendance.subject.name} • {attendance.class.name}
                                                </p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                                    {new Date(attendance.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={getStatusBadge(attendance.status)}>
                                                {attendance.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                    No attendance records found
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Class Attendance Summary */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                {isAdmin ? "Today's Class Attendance" : "My Classes Today"}
                            </h3>
                        </div>
                        <div className="p-6">
                            {((classAttendance?.length ?? 0) > 0 || (myClassesAttendance?.length ?? 0) > 0) ? (
                                <div className="space-y-4">
                                    {(classAttendance || myClassesAttendance || []).slice(0, 5).map((cls) => (
                                        <div key={cls.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium text-gray-900 dark:text-white">{cls.name}</h4>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {cls.total_students} students
                                                </span>
                                            </div>
                                            <div className="flex space-x-4">
                                                <div className="flex items-center">
                                                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        Present: {cls.present_count}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        Absent: {cls.absent_count}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                    No attendance data for today
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Attendance Rate Summary */}
                {stats.todays_attendance > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-8">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Today's Attendance Rate</h3>
                        <div className="flex items-center">
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div 
                                    className="bg-green-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${attendanceRate}%` }}
                                ></div>
                            </div>
                            <span className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
                                {attendanceRate}%
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {stats.present_today} out of {stats.todays_attendance} attendance records marked as present
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}