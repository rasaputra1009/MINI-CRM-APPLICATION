<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        <link rel="stylesheet" href="{{normalize_chunks('/build/chart-app/main.css')}}"></script>
        {{-- <link rel="stylesheet" href="{{normalize_chunks('/build/global/globalStyles.css')}}"> --}}
    </head>
    <body>
        
        <div id="app"></div>
        <script src="{{normalize_chunks('/build/chart-app/main.js')}}"></script>
    </body>
</html>
