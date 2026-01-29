import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
export default function Dashboard({ auth }) {
    return (_jsxs(AuthenticatedLayout, { header: _jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Dashboard" }), children: [_jsx(Head, { title: "Dashboard" }), _jsx("div", { className: "py-12", children: _jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: _jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: _jsxs("div", { className: "p-6 text-gray-900", children: ["Bem-vindo, ", auth.user.name, "!", _jsxs("div", { className: "mt-4", children: [_jsxs("p", { children: ["Status: ", auth.user.status] }), _jsxs("p", { children: ["Perfil: ", auth.user.role] })] })] }) }) }) })] }));
}
//# sourceMappingURL=Dashboard.js.map