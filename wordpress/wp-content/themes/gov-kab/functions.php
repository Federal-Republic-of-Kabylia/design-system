<?php
/**
 * GOV.KAB block theme setup.
 *
 * @package GOV_KAB
 */

declare(strict_types=1);

function gov_kab_setup(): void {
    add_theme_support('wp-block-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');
    add_editor_style('style.css');
}
add_action('after_setup_theme', 'gov_kab_setup');

function gov_kab_register_pattern_category(): void {
    register_block_pattern_category('gov-kab', [
        'label' => __('GOV.KAB Government', 'gov-kab'),
    ]);
}
add_action('init', 'gov_kab_register_pattern_category');

function gov_kab_enqueue_fonts(): void {
    wp_enqueue_style(
        'gov-kab-fonts',
        'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap',
        [],
        null
    );
}
add_action('wp_enqueue_scripts', 'gov_kab_enqueue_fonts');
