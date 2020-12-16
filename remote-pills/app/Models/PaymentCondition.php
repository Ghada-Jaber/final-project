<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentCondition extends Model
{
    use HasFactory;

    protected $table = 'payment_condition';

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
                  'payment_type_id'
              ];

    public function buy(){
     return $this->belongsTo(Buy::class);
    }

    public function paymentType(){
        return $this->belongsTo(PaymentType::class);//payment_type_id
    }

}
