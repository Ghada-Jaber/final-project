<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationCondition extends Model
{
    use HasFactory;


    protected $table = 'reservation_condition';

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
                  'reservation_id',
                  'reservation_type_id',
                  'payment_id'
              ];

    public function reservation(){
     return $this->belongsTo(Reservation::class);
    }

    public function reservationType(){
        return $this->belongsTo(ReservationType::class);
    }

    public function payment(){
        return $this->belongsTo(Payment::class);
    }

   
}
