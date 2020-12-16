<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentConditionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_condition', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buy_id')->constrained('buy')->onDelete('cascade');
            $table->foreignId('payment_type_id')->constrained('payment_type')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['buy_id', 'payment_type_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_condition');
    }
}
