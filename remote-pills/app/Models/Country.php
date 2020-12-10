<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;


    protected $table = 'country';

    /**
    * The database primary key value.
    *
    * @var string
    */
    protected $primaryKey = 'id';



    protected $fillable = [
        'name'
    ];


    public function City(){
        return $this->hasMany(City::class);
    }
}
