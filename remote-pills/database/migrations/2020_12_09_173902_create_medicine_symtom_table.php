<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedicineSymtomTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medicine_symptom', function (Blueprint $table) {
            $table->id();
            $table->foreignId('medicine_id')->constrained('medicine')->onDelete('cascade');
            $table->foreignId('symptom_id')->constrained('symptom')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medicine_symtom');
    }
}
