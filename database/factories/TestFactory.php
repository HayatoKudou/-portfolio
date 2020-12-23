<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Analysis::class, function (Faker $faker) {
    $date = \Carbon\Carbon::now();
    return [
        // データをセット
        'url' => $faker->url,
        'count' => $faker->count,
        'date' => $date,
    ];
});
