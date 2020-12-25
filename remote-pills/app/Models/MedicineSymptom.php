<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicineSymptom extends Model
{
    use HasFactory;

    protected $table = 'medicine_symptom';

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
                  'medicine_id',
                  'symptom_id'
              ];


    public function medicine(){
        return $this->belongsTo(Medicine::class);
    }
    
    public function symptom(){
        return $this->belongsTo(Symptom::class);
    }

}
