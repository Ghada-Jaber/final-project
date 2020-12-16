<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tablet extends Model
{
    use HasFactory;

    protected $table = 'dosage';

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
                  'tablet'
              ];

              public function medicine(){
                return $this->belongsToMany(Medicine::class);
            }

              public function dosage(){
                return $this->belongsToMany(Dosage::class);
            }
}
