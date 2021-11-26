<!DOCTYPE html>
<html>
<head>
    <title>CRM</title>
   <link rel="stylesheet" href="{{normalize_chunks('/build/crm-app/main.css')}}">
</head>
<body>
<div id='app'></div>
{{-- <script>
    window.userInfo={};
    userInfo.username='{{$user}}',
    userInfo.userrole='{{$userrole}}'
    Object.freeze(userInfo);
</script> --}}
<script src="{{normalize_chunks('/build/crm-app/vendors~main.chunk.js')}}"></script>
<script src="{{normalize_chunks('/build/crm-app/main.js')}}"></script>
</body>
</html>