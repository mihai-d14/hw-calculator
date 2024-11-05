<?php

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$json = file_get_contents('php://input');
$data = json_decode($json);

// Validate input
if (!$data || !isset($data->frequency) || !is_numeric($data->frequency)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit();
}

$p = floatval($data->frequency);

// Validate frequency range
if ($p < 0 || $p > 1) {
    http_response_code(400);
    echo json_encode(['error' => 'Frequency must be between 0 and 1']);
    exit();
}

// Calculate Hardy-Weinberg equilibrium
$q = 1 - $p;
$result = [
    'aa' => $p * $p,
    'aq' => 2 * $p * $q,
    'qq' => $q * $q
];

// Return result
echo json_encode($result);
?>