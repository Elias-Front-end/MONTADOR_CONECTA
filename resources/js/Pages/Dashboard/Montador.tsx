import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function MontadorDashboard({ upcomingServices, invitations }: any) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Painel do Montador</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Upcoming Services */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Próximos Serviços</h3>
                            {upcomingServices.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {upcomingServices.map((service: any) => (
                                        <li key={service.id} className="py-4">
                                            <div className="flex justify-between">
                                                <div>
                                                    <p className="font-semibold">{service.title}</p>
                                                    <p className="text-sm text-gray-500">{service.address}</p>
                                                    <p className="text-sm text-blue-600">{new Date(service.scheduled_at).toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                        {service.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">Nenhum serviço agendado.</p>
                            )}
                        </div>
                    </div>

                    {/* Invitations */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Convites Disponíveis</h3>
                            {invitations.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {invitations.map((service: any) => (
                                        <li key={service.id} className="py-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold">{service.title}</p>
                                                    <p className="text-sm text-gray-500">{service.address}</p>
                                                </div>
                                                <Link
                                                    href={route('services.show', service.id)}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                                                >
                                                    Ver Detalhes
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">Nenhum convite no momento.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
