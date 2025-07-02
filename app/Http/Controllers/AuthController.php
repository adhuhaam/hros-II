<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }

        return view('login', ['currentPage' => 'login']);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return $request->expectsJson()
                ? response()->json(['success' => true, 'redirect' => route('dashboard')])
                : redirect()->route('dashboard');
        }

        return $request->expectsJson()
            ? response()->json(['success' => false, 'message' => 'Invalid credentials'], 401)
            : back()->withErrors(['email' => 'Invalid credentials']);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return $request->expectsJson()
            ? response()->json(['success' => true, 'redirect' => route('welcome')])
            : redirect()->route('welcome');
    }
}
