<?php
// Upload this file to your cPanel public_html folder

// Allow requests from any origin (or restrict to your domain)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ------------------------------------------------------------------
// SECURELY STORE YOUR API KEYS HERE
// ------------------------------------------------------------------
// Replace the value below with your actual MailerSend API Key
$mailersend_api_key = "mlsn.c681738d1ada1ce93a959721d3a6a6146df3ef5ba612a67dc99f0bdebcb382f3";
$supabase_url = "https://agkggkrkormomjixlzwb.supabase.co";
$supabase_anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFna2dna3Jrb3Jtb21qaXhsendiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNDYxNDgsImV4cCI6MjA4NDcyMjE0OH0.lO1BcQb-rOaUr1ZenBG31AuZgGxfnPKvFDGxbLdTGEg";

// ------------------------------------------------------------------

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputJSON = file_get_contents('php://input');
    
    // Initialize cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.mailersend.com/v1/email");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $inputJSON);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    // Add headers
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer $mailersend_api_key",
        "Content-Type: application/json",
        "X-Requested-With: XMLHttpRequest"
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    http_response_code($httpCode);
    
    if ($curlError) {
        echo json_encode(["error" => "cURL Error: " . $curlError]);
    } else {
        echo $response;
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}
?>