import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: '📊',
            title: 'Real-time Attendance Tracking',
            description: 'Mark and monitor student attendance across all subjects and classes with instant updates and comprehensive reporting.'
        },
        {
            icon: '👥',
            title: 'Student Management',
            description: 'Manage complete student profiles including personal information, class assignments, and attendance history.'
        },
        {
            icon: '📚',
            title: 'Subject & Class Organization',
            description: 'Organize students by subjects and classes with flexible teacher assignments and scheduling capabilities.'
        },
        {
            icon: '📈',
            title: 'Analytics & Reports',
            description: 'Generate detailed attendance reports and analytics to track student performance and identify patterns.'
        },
        {
            icon: '👨‍🏫',
            title: 'Teacher Dashboard',
            description: 'Dedicated teacher interface for marking attendance, viewing assigned classes, and managing daily records.'
        },
        {
            icon: '🔐',
            title: 'Role-based Access',
            description: 'Secure access control with separate interfaces for administrators and teachers with appropriate permissions.'
        }
    ];

    return (
        <>
            <Head title="EduTrack - Student Attendance Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <header className="mb-8 w-full max-w-7xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="text-3xl">📚</div>
                            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">EduTrack</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="w-full max-w-7xl">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="mb-6">
                            <span className="inline-block text-6xl mb-4">🎓</span>
                        </div>
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Student Attendance Management System
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Streamline your school's attendance tracking with our comprehensive digital solution. 
                            Perfect for administrators and teachers to manage daily attendance across all subjects and classes.
                        </p>
                        
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">📊</div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Real-time Tracking</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">👨‍🎓</div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Student Profiles</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">👨‍🏫</div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Teacher Access</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">📈</div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Analytics</div>
                            </div>
                        </div>

                        {!auth.user && (
                            <Link
                                href={route('register')}
                                className="inline-flex items-center rounded-lg bg-indigo-600 px-8 py-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                            >
                                Start Managing Attendance Today
                                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Demo Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                How It Works
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Our intuitive system makes attendance management simple and efficient for both administrators and teachers.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">1️⃣</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Setup Classes & Students</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Administrators create classes, add students, and assign teachers to subjects.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">2️⃣</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mark Attendance</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Teachers easily mark attendance for their assigned classes and subjects daily.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">3️⃣</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Track & Analyze</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    View comprehensive reports and analytics on attendance patterns and trends.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* User Roles Section */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
                            <div className="text-4xl mb-4">👩‍💼</div>
                            <h3 className="text-2xl font-bold mb-4">For Administrators</h3>
                            <ul className="space-y-2 text-blue-100">
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Manage all students, teachers, and classes
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    View comprehensive attendance reports
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Configure subjects and class assignments
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Monitor system-wide attendance trends
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
                            <div className="text-4xl mb-4">👨‍🏫</div>
                            <h3 className="text-2xl font-bold mb-4">For Teachers</h3>
                            <ul className="space-y-2 text-green-100">
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Quick and easy attendance marking
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    View assigned classes and subjects
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Track student attendance patterns
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Add notes for attendance records
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>

                <footer className="w-full max-w-7xl text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-8">
                    <p>
                        Built with ❤️ using Laravel and React. Perfect for schools, colleges, and educational institutions.
                    </p>
                </footer>
            </div>
        </>
    );
}