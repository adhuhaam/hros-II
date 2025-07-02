import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, ChevronDownIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from './ThemeContext';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function UserMenu() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
          <span className="text-sm font-bold">A</span>
        </div>
        <span className="hidden md:block font-medium">Admin</span>
        <ChevronDownIcon className="w-4 h-4" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-muted shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-border">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-foreground">Signed in as</p>
            <p className="truncate text-sm text-muted-foreground">admin@example.com</p>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-muted/60 text-primary' : 'text-foreground',
                    'flex items-center w-full px-4 py-2 text-sm rounded-lg transition-colors duration-150'
                  )}
                >
                  <UserIcon className="w-5 h-5 mr-2" /> Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-muted/60 text-primary' : 'text-foreground',
                    'flex items-center w-full px-4 py-2 text-sm rounded-lg transition-colors duration-150'
                  )}
                >
                  <Cog6ToothIcon className="w-5 h-5 mr-2" /> Settings
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={toggleTheme}
                  className={classNames(
                    active ? 'bg-muted/60 text-primary' : 'text-foreground',
                    'flex items-center w-full px-4 py-2 text-sm rounded-lg transition-colors duration-150'
                  )}
                >
                  {theme === 'dark' ? <SunIcon className="w-5 h-5 mr-2" /> : <MoonIcon className="w-5 h-5 mr-2" />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => window.dispatchEvent(new Event('logout'))}
                  className={classNames(
                    active ? 'bg-destructive/10 text-destructive' : 'text-foreground',
                    'flex items-center w-full px-4 py-2 text-sm rounded-lg transition-colors duration-150'
                  )}
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" /> Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
