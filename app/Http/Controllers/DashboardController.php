<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'montador') {
            return $this->montadorDashboard($user);
        } elseif (in_array($user->role, ['marcenaria', 'lojista'])) {
            return $this->companyDashboard($user);
        } elseif ($user->role === 'admin') {
            return $this->adminDashboard($user);
        }

        return Inertia::render('Dashboard');
    }

    protected function montadorDashboard($user)
    {
        $upcomingServices = Service::where('montador_id', $user->id)
            ->where('status', 'accepted')
            ->where('scheduled_at', '>=', now())
            ->orderBy('scheduled_at')
            ->take(5)
            ->get();

        $invitations = Service::where('montador_id', $user->id) // Or logic for open services from linked companies
            ->where('status', 'open')
            ->get();

        return Inertia::render('Dashboard/Montador', [
            'upcomingServices' => $upcomingServices,
            'invitations' => $invitations
        ]);
    }

    protected function companyDashboard($user)
    {
        $services = Service::where('owner_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('Dashboard/Company', [
            'recentServices' => $services
        ]);
    }

    protected function adminDashboard($user)
    {
        return Inertia::render('Dashboard/Admin', [
            // stats
        ]);
    }
}
