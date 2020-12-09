<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pharmacy_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('medicine_id')->constrained('medicine')->onDelete('cascade');
            $table->integer('quantity');
            $table->double('price');
            $table->date('MFD');
            $table->date('EXP');
            $table->unique(['pharmacy_id', 'medicine_id']);
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
        Schema::dropIfExists('detail');
    }
}
