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
                  'buy_id',
                  'reservation_type_id'
              ];

    public function buy(){
     return $this->belongsTo(Buy::class);
    }

    public function reservationType(){
        return $this->belongsTo(ReservationType::class);
    }

   
}
