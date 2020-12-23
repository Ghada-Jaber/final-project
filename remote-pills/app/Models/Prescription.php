<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    use HasFactory;


    protected $table = 'prescription';

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
                  'patient_id',
                  'medicine_id',
                  'quantity'
              ];

    public function patient(){
     return $this->belongsTo(Patient::class);
    }

    public function medicine(){
        return $this->belongsTo(Medicine::class);
       }
}
