<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;

    protected $table = 'medicine';

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
                  'name',
                  'image',
                  'format',
                  'description',
                  'ingredient',
                  'prescription',
                  'tablet',
                  'dosage',
                  'dosage_unit'
              ];


    public function detail(){
        return $this->hasMany(Detail::class);
    }


    public function prescription(){
        return $this->hasMany(Prescription::class);//yimken hasOne
    }

    public function medicineSymtom(){
        return $this->hasMany(MedicineSymtom::class);
    }

    public function reservation(){
        return $this->hasMany(Reservation::class);
    }


    public function pharmacy(){
        return $this->belongsToMany(User::class, 'detail', 'medicine_id', 'pharmacy_id');
    }


    public function symptom(){
        return $this->belongsToMany(Symptom::class);
    }
   
}
