<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payment';

    /**
    * The database primary key value.
    *
    * @var string
    */
    protected $primaryKey = 'id';


    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
                  'price'
              ];

    public function buy(){
     return $this->hasMany(Buy::class);
    }

    public function reservationCondition(){
        return $this->hasMany(ReservationCondition::class);
    }


    public function paymentCondition(){
        return $this->hasMany(PaymentCondition::class);
    }
}
