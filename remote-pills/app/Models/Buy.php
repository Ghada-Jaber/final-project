<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buy extends Model
{
    use HasFactory;


    protected $table = 'buy';

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
                  'reservation'
              ];


    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function medicine(){
        return $this->belongsTo(Medicine::class);
    }


    public function payment(){
        return $this->belongsTo(Payment::class);
    }
    
}
