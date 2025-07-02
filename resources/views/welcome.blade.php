@extends('layouts.app')

@section('title', 'Welcome')

@section('content')
<div id="app-root"></div>
@vite(['resources/js/app.tsx'])
@endsection
