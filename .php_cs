<?php


$rules = [
    '@PSR2' => true,
    'ordered_imports' => [
        'sortAlgorithm' => 'length',
    ],
    'single_quote' => true,
    'trailing_comma_in_multiline_array' => true,
    'array_syntax' => ['syntax' => 'short'],
		'single_blank_line_before_namespace' => true,
];

return PhpCsFixer\Config::create()
    ->setRules($rules)
    ->setUsingCache(false)
    ->setFinder(
        PhpCsFixer\Finder::create()
            ->in(__DIR__.'/app')
            ->in(__DIR__.'/config')
    );
