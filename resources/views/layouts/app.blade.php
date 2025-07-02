<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'HRoS') }} - @yield('title', 'Human Resource Operations System')</title>
    
    <!-- Preconnect to external resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- Scripts and Styles -->
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    
    <!-- Meta Tags -->
    <meta name="description" content="HRoS - Comprehensive Human Resource Operations System for modern workforce management">
    <meta name="keywords" content="HR, Human Resources, Employee Management, Workforce, HRoS">
    <meta name="author" content="HRoS Team">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" href="/favicon.png">
    
    @stack('head')
</head>
<body class="antialiased">
    <!-- Main Content -->
    <main id="app" class="w-full min-h-screen">
        @yield('content')
    </main>
    @stack('scripts')
</body>
</html>