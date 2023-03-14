<?php

use App\Http\Controllers\Api\V1\SkillController;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function() {
    Route::apiResource('skills', SkillController::class);
});