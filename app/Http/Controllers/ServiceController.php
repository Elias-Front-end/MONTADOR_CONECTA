<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $query = Service::query();

        if ($user->role === 'montador') {
            // Show services assigned to montador or available from linked companies
            $query->where('montador_id', $user->id)
                  ->orWhere(function($q) use ($user) {
                      $q->whereNull('montador_id')
                        ->whereIn('owner_id', $user->linkedCompanies()->pluck('users.id'));
                  });
        } elseif (in_array($user->role, ['marcenaria', 'lojista'])) {
            $query->where('owner_id', $user->id);
        }

        $services = $query->with(['owner', 'montador'])->latest()->paginate(10);

        return Inertia::render('Services/Index', [
            'services' => $services
        ]);
    }

    public function create()
    {
        return Inertia::render('Services/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string',
            'scheduled_at' => 'required|date',
            'price' => 'nullable|numeric',
        ]);

        $request->user()->servicesOwned()->create($request->all());

        return redirect()->route('services.index')->with('success', 'Serviço criado com sucesso.');
    }

    public function show(Service $service)
    {
        // Authorization check needed
        return Inertia::render('Services/Show', [
            'service' => $service->load(['owner', 'montador'])
        ]);
    }

    public function accept(Service $service)
    {
        $user = Auth::user();
        
        if ($user->role !== 'montador') {
            abort(403);
        }

        // Check availability logic here

        $service->update([
            'montador_id' => $user->id,
            'status' => 'accepted'
        ]);

        return back()->with('success', 'Serviço aceito com sucesso!');
    }
}
