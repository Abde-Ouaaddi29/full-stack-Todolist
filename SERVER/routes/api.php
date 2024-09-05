<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\CsrfController;
use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [RegisteredUserController::class, 'register']);

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// Route::get('/csrf-token', [CsrfController::class, 'index'])->name('csrf-token');
// Auth routes
Route::middleware(['auth:sanctum', 'web'])->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::apiResource('todos', TodoController::class);
});

// Todo routes

