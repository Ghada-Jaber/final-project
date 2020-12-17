<!DOCTYPE html>
<html class="no-js" lang="">
<head>
<title> Remote Pills</title>
    <meta charset="utf-8">
    <link rel="icon" href="images/logo.ico" />
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{{asset('css/app.css')}}" rel="stylesheet">
    <link href="{{asset('css/bootstrap.min.css')}}" rel="stylesheet">
  
    <link rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">   

         <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBp6txXqL4CpgictG68veqo6MmEb89yFE4&callback=initMap&libraries=places&v=weekly"
      defer
    ></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    </head>

<body>
   <div id="root">

   </div>

    <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
