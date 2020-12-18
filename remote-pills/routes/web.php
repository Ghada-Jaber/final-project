<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('{path?}', 'app');

Route::view('managePharmacy/show/{id}', 'app');
Route::view('managePharmacy/edit/{id}', 'app');
Route::view('manageMedicine/show/{id}', 'app');
Route::view('manageMedicine/edit/{id}', 'app');

Route::view('medicine/add', 'app');
Route::view('medicine/show/{id}', 'app');


Route::view('/storage/app/uploads/userimage/NoImage.png', 'app');




