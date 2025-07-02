<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Welcome Page
Route::get('/', function () {
    return view('welcome', ['currentPage' => 'welcome']);
})->name('welcome');

// Authentication Routes
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Dashboard Routes (Protected)
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/employees', [DashboardController::class, 'employees'])->name('employees');
    Route::get('/attendance', [DashboardController::class, 'attendance'])->name('attendance');
    Route::get('/reports', [DashboardController::class, 'reports'])->name('reports');
    Route::get('/performance', [DashboardController::class, 'performance'])->name('performance');
    Route::get('/admin', function () {
        return view('admin', ['currentPage' => 'admin']);
    })->middleware('role:admin')->name('admin');
});

// API Routes for AJAX calls
Route::prefix('api')->group(function () {
    Route::get('/dashboard/stats', [DashboardController::class, 'getStats'])->name('api.dashboard.stats');
});

// Fallback route
Route::fallback(function () {
    return redirect()->route('welcome');
});