<?php

namespace App\Observers;

use App\Models\Buy;

use App\Models\User;


use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Notification;
use App\Notifications\PushNotification;

class BuyObserver
{
    /**
     * Handle the Buy "created" event.
     *
     * @param  \App\Models\Buy  $buy
     * @return void
     */
    public function created(Buy $buy)
    {
        $title ="addedd buy";
        $body = "New Buy : ".$buy->id;
        $icon =null;
        $data = $buy;
        $auth_id = Auth::id();
        $users = User::where('id','!=',$auth_id)->get();//where('fcm_token','!=','')->pluck('fcm_token')->toArray();
        Notification::send($users ,new PushNotification($buy));
    }

    /**
     * Handle the Buy "updated" event.
     *
     * @param  \App\Models\Buy  $buy
     * @return void
     */
    public function updated(Buy $buy)
    {
        //
    }

    /**
     * Handle the Buy "deleted" event.
     *
     * @param  \App\Models\Buy  $buy
     * @return void
     */
    public function deleted(Buy $buy)
    {
        //
    }

    /**
     * Handle the Buy "restored" event.
     *
     * @param  \App\Models\Buy  $buy
     * @return void
     */
    public function restored(Buy $buy)
    {
        //
    }

    /**
     * Handle the Buy "force deleted" event.
     *
     * @param  \App\Models\Buy  $buy
     * @return void
     */
    public function forceDeleted(Buy $buy)
    {
        //
    }
}
