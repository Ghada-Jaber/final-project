<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $table = 'reservation';

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
                  'customer_id',
                  'medicine_id'
              ];

              
    public function reservationCondition(){
     return $this->hasMany(ReservationCondition::class);
    }
    public function customer(){
     return $this->belongsTo(Customer::class);
    }

    public function medicine(){
        return $this->belongsTo(Medicine::class);
    }
}
