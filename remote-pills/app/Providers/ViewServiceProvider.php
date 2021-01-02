<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use App\Http\View\Composers\ProfileComposer;

use App\Models\User;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
          
        if (Auth::check()) {
       // The user is logged in...
       $user = Auth::user();
       if($user instanceOf User){
       $notifications =$user->notifications()->select('id','data','created_at','read_at')->get(); 
       $notificationCount = $user->unreadNotifications()->count();
        }


       return response()->json(['notifications'=> $notifications,'notificationCount'=>$notificationCount]);
    
       }
    }
}
