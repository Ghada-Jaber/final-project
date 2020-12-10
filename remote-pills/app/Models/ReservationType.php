<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationType extends Model
{
    use HasFactory;


    protected $table = 'reservation_type';

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
                  'type'
              ];

    public function reservationCondition(){
     return $this->hasMany(ReservationCondition::class);// reservation_condition
    }
}
