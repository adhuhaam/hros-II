import React, { ReactNode, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, HomeIcon, UsersIcon, BriefcaseIcon, ChartBarIcon, DocumentTextIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useTheme } from './ThemeContext';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Employees', href: '/employees', icon: UsersIcon },
    { name: 'Recruitment', href: '/recruitment', icon: BriefcaseIcon },
    { name: 'Performance', href: '/performance', icon: ChartBarIcon },
    { name: 'Reports', href: '/reports', icon: DocumentTextIcon },
];

export default function Layout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    return (
        <div className="h-screen flex bg-background">
            {/* Mobile sidebar */}
            <Transition show={sidebarOpen} as={React.Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={React.Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 flex z-40">
                        <Transition.Child
                            as={React.Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-muted border-r border-border pb-4">
                                <div className="flex items-center justify-between h-16 px-4">
                                    <span className="text-xl font-bold gradient-text-primary">HRoS</span>
                                    <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-muted focus:outline-none">
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                                <nav className="flex-1 px-2 space-y-1">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`group flex items-center px-2 py-2 text-base font-medium rounded-lg transition-colors duration-150 ${location.pathname.startsWith(item.href) ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted/60'}`}
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <item.icon className="mr-4 h-6 w-6" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true" />
                    </div>
                </Dialog>
            </Transition>

            {/* Desktop sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-muted border-r border-border">
                <div className="flex items-center h-16 px-4 border-b border-border">
                    <span className="text-xl font-bold gradient-text-primary">HRoS</span>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`group flex items-center px-2 py-2 text-base font-medium rounded-lg transition-colors duration-150 ${location.pathname.startsWith(item.href) ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted/60'}`}
                        >
                            <item.icon className="mr-4 h-6 w-6" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col lg:pl-64">
                {/* Topbar */}
                <div className="sticky top-0 z-30 flex h-16 bg-white dark:bg-muted border-b border-border shadow-sm items-center px-4 justify-between">
                    <div className="flex items-center">
                        <button className="lg:hidden p-2 rounded-lg hover:bg-muted focus:outline-none" onClick={() => setSidebarOpen(true)}>
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                        <h1 className="ml-2 text-2xl font-bold gradient-text-primary hidden md:block">HR Management System</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                        </button>
                        <UserMenu />
                    </div>
                </div>
                {/* Page content */}
                <main className="flex-1 bg-background p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
} 