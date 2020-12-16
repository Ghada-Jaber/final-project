<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBuyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buy', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customer')->onDelete('cascade');
            $table->foreignId('medicine_id')->constrained('medicine')->onDelete('cascade');
            $table->double('price');
            $table->boolean('reservation');
            $table->timestamps();
            $table->unique(['customer_id', 'medicine_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('buy');
    }
}
