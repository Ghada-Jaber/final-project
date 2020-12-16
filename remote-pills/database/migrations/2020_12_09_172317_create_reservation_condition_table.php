<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationConditionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservation_condition', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buy_id')->constrained('buy')->onDelete('cascade');
            $table->foreignId('reservation_type_id')->constrained('reservation_type')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['buy_id', 'reservation_type_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservation_condition');
    }
}
