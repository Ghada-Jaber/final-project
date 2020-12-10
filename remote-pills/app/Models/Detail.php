<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail extends Model
{
    use HasFactory;

    protected $table = 'detail';

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
                  'medicine_id',
                  'quantity',
                  'price',
                  'MFD',
                  'EXP'
              ];
    
              

    public function pharmacy(){
        return $this->belongsTo(User::class);
    }

    public function medicine(){
        return $this->belongsTo(Medicine::class);
    }
    

}
