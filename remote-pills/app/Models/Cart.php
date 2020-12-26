<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'cart';

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
                  'medicine_id',
                  'quantity',
                  'price',
                  'reservation',
                  'confirmation'
              ];


    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function medicine(){
        return $this->belongsTo(Medicine::class);
    }
}
