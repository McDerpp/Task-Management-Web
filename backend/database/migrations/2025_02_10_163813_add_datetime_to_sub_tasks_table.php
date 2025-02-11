<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('sub_tasks', function (Blueprint $table) {
            $table->timestamp('datetime')->nullable()->after('completed');
        });
    }

    public function down()
    {
        Schema::table('sub_tasks', function (Blueprint $table) {
            $table->dropColumn('datetime');
        });
    }
};
