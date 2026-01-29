import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
export default function Authenticated({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { auth } = usePage().props;
    const user = auth.user;
    return (_jsxs("div", { className: "min-h-screen bg-gray-100", children: [_jsx("nav", { className: "bg-primary border-b border-primary-400", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between h-16", children: [_jsxs("div", { className: "flex", children: [_jsx("div", { className: "shrink-0 flex items-center", children: _jsx(Link, { href: "/", className: "text-white font-bold text-xl", children: "MONTADOR CONECTA" }) }), _jsxs("div", { className: "hidden space-x-8 sm:-my-px sm:ml-10 sm:flex", children: [_jsx(Link, { href: route('dashboard'), className: `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${route().current('dashboard')
                                                    ? 'border-white text-white'
                                                    : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'}`, children: "Dashboard" }), _jsx(Link, { href: route('services.index'), className: `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${route().current('services.index')
                                                    ? 'border-white text-white'
                                                    : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'}`, children: "Servi\u00E7os" })] })] }), _jsx("div", { className: "hidden sm:flex sm:items-center sm:ml-6", children: _jsx("div", { className: "ml-3 relative", children: _jsxs("div", { className: "text-white text-sm", children: [user.name, " (", user.role, ")"] }) }) })] }) }) }), header && (_jsx("header", { className: "bg-white shadow", children: _jsx("div", { className: "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8", children: header }) })), _jsx("main", { children: children })] }));
}
//# sourceMappingURL=AuthenticatedLayout.js.map