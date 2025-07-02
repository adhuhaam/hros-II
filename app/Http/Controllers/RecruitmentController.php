<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class RecruitmentController extends Controller
{
    /**
     * Display a listing of candidates.
     */
    public function index(): View
    {
        $candidates = Candidate::all();

        return view('recruitment.index', compact('candidates'));
    }

    /**
     * Show the form for creating a new candidate.
     */
    public function create(): View
    {
        return view('recruitment.create');
    }

    /**
     * Store a newly created candidate in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:candidates,email',
            'phone' => 'nullable|string',
            'status' => 'required|string',
        ]);

        Candidate::create($data);

        return redirect()->route('recruitment.index');
    }

    /**
     * Remove the specified candidate from storage.
     */
    public function destroy(Candidate $candidate): RedirectResponse
    {
        $candidate->delete();

        return redirect()->route('recruitment.index');
    }
}
