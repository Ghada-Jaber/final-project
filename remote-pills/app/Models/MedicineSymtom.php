<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicineSymtom extends Model
{
    use HasFactory;

    protected $table = 'medicine_symtom';

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
                  'symtom_id'
              ];


    public function medicine(){
        return $this->belongsTo(Medicine::class);
    }
    
    public function symtom(){
        return $this->belongsTo(Symtom::class);
    }

}
