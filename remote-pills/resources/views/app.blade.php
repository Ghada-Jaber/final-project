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

          <style>
.div1 { width: 850px;height: 587px; border: 4px solid #15f7f7;;}
.hh1 {font-size: 20px;color: #13895F;font-family: 'Roboto Condensed', sans-serif;text-align: center;}
.hh2 {font-size: 20px;color: #990033;font-family: 'Roboto Condensed', sans-serif;text-align: center;}
.hh3 {font-size: 20px;color: #cc0066;font-family: 'Roboto Condensed', sans-serif;text-align: center;}
.msg_container_base{
  background: #e5e5e5;
  margin: 0;
  padding: 0 10px 10px;
  max-height:150px;
  overflow-x:hidden;
}

.msg_receive{
    padding-left:0;
    margin-left:0;
}

.messages {
  background: white;
  padding: 10px;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  max-width:100%;
}
.messages > p {
    font-size: 13px;
    margin: 0 0 0.2rem 0;
  }
.messages > time {
    font-size: 11px;
    color: #ccc;
}
.msg_container {
    padding: 10px;
    overflow: hidden;
    display: flex;
}


.msg_sent > time{
    float: right;
}





select.icon-menu option{
background-repeat: no-repeat;
background-position:bottom left;
padding-left: 20px;
}

</style>

    </head>

<body>
   <div id="root">

   </div>

    <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
