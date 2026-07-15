<?php

require_once __DIR__ . '/../Submarine.php';

test('should compute example from mission', function () {
    $lines = [
        'forward 5',
        'down 5',
        'forward 8',
        'up 3',
        'down 8',
        'forward 2',
    ];

    $submarine = new Submarine();
    $submarine->executeAll($lines);

    expect($submarine->horizontal)->toBe(15);
    expect($submarine->depth)->toBe(10);
    expect($submarine->finalPosition())->toBe(150);
});

test('should move on given text instructions', function () {
    $lines = file(__DIR__ . '/submarine.txt', FILE_IGNORE_NEW_LINES);

    $submarine = new Submarine();
    $submarine->executeAll($lines);

    $result = $submarine->finalPosition();

    echo "Horizontal: {$submarine->horizontal}\n";
    echo "Depth: {$submarine->depth}\n";
    echo "Access Coordinate: {$result}\n";

    expect($result)->toBeGreaterThan(0);
});