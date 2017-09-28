<?php

function normalize_chunks($filepath)
{
    $paths = collect(preg_split('#/#', $filepath))
                ->reject(function ($path) {
                    return $path === '';
                });
    $path = $paths->slice(0, -1)->implode('/');
    $filename = $paths->last();
    $pathPrefix = '/';

    if (file_exists(public_path($path.'/hot-manifest.json'))) {
        $port = json_decode(file_get_contents(public_path($path.'/hot-manifest.json')), true)['port'];
        $pathPrefix = "//localhost:{$port}/";
    }

    $normalizeJson = json_decode(file_get_contents(public_path("{$path}/normalizeChunks.json")), true);

    return "${pathPrefix}{$path}/".array_get($normalizeJson, $filename, $filename);
}
