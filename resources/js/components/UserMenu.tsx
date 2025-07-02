import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';

export default function UserMenu() {
  const logout = () => {
    window.dispatchEvent(new Event('logout'));
  };
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors duration-200">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
          <span className="text-sm">A</span>
        </div>
        <span className="hidden md:block">Admin</span>
        <ChevronDown className="w-4 h-4" />
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
        <Menu.Items className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl z-50">
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${active ? 'bg-muted' : ''} flex items-center space-x-2 px-4 py-2 transition-colors duration-200`}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${active ? 'bg-muted' : ''} flex items-center space-x-2 px-4 py-2 transition-colors duration-200`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </a>
              )}
            </Menu.Item>
            <div className="my-2 border-t border-border" />
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${active ? 'bg-muted' : ''} flex items-center space-x-2 w-full px-4 py-2 text-left text-destructive transition-colors duration-200`}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
