<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $table = 'patient';

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
                  'doctor_id'
              ];


    public function patient(){
        return $this->belongsTo(User::class);
    }
    
    public function doctor(){
        return $this->belongsTo(User::class);
    }


    public function prescription(){
        return $this->hasMany(Prescription::class);
    }
}
