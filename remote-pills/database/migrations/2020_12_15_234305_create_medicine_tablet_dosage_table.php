<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedicineTabletDosageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medicine_tablet_dosage', function (Blueprint $table) {
            $table->id();
            $table->foreignId('medicine_tablet_id')->constrained('medicine_tablet')->onDelete('cascade');
            $table->foreignId('dosage_id')->constrained('dosage')->onDelete('cascade');
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
        Schema::dropIfExists('medicine_tablet_dosage');
    }
}
