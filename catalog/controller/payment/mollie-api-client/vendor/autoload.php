<?php

// scoper-composer-autoload.php @generated by PhpScoper

$loader = require_once __DIR__.'/composer-autoload.php';

// Functions whitelisting. For more information see:
// https://github.com/humbug/php-scoper/blob/master/README.md#functions-whitelisting
if (!function_exists('database_write')) {
    function database_write() {
        return \_PhpScoper5bbb1f4b001f3\database_write(...func_get_args());
    }
}
if (!function_exists('database_read')) {
    function database_read() {
        return \_PhpScoper5bbb1f4b001f3\database_read(...func_get_args());
    }
}
if (!function_exists('printOrders')) {
    function printOrders() {
        return \_PhpScoper5bbb1f4b001f3\printOrders(...func_get_args());
    }
}
if (!function_exists('composerRequirea3126e82b6f8a8825a16880fe8b70058')) {
    function composerRequirea3126e82b6f8a8825a16880fe8b70058() {
        return \_PhpScoper5bbb1f4b001f3\composerRequirea3126e82b6f8a8825a16880fe8b70058(...func_get_args());
    }
}

return $loader;
