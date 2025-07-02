@extends('layouts.app')

@section('title', 'Performance')

@section('content')
<div id="app-root"></div>
@vite(['resources/js/app.tsx'])
@endsection
