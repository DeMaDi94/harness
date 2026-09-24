<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => app()->getLocale(),
            'locales' => config('app.locales'),
            /* B6 — the active locale's catalogue, sent once and kept by the
               client across visits. The key changes with the locale and with
               the file, so a switch or an edited translation is fetched again. */
            'i18n' => Inertia::once(fn (): array => $this->translations())
                ->as('i18n.'.app()->getLocale().'.'.$this->translationsVersion()),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    /**
     * @return array<string, string>
     */
    private function translations(): array
    {
        $path = lang_path(app()->getLocale().'.json');

        if (! is_file($path)) {
            return [];
        }

        /** @var array<string, string> $catalogue */
        $catalogue = json_decode((string) file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);

        return $catalogue;
    }

    private function translationsVersion(): string
    {
        $path = lang_path(app()->getLocale().'.json');

        return is_file($path) ? (string) filemtime($path) : '0';
    }
}
