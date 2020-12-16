<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'customer';

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
                  'pharmacy_id',
                  'customer_id'
              ];
    
              


    public function buy(){
        return $this->hasMany(Buy::class);
    }


    public function pharmacy(){
    return $this->belongsTo(User::class);
    }


    public function customer(){
        return $this->belongsTo(User::class);
        }

 
}
