<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Symtom extends Model
{
    use HasFactory;

    protected $table = 'symtom';

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
                  'name'
              ];


    public function medicineSymtom(){
        return $this->hasMany(MedicineSymtom::class);
    }


    public function symtom(){
        return $this->belongsToMany(Medicine::class);
    }

}
