import { router } from '@inertiajs/react';
import type { HTMLAttributes } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

/**
 * Each language is named in itself („Deutsch“, „English“), so a reader who
 * cannot read the current one still finds their own.
 */
const endonym = (locale: string): string =>
    new Intl.DisplayNames([locale], { type: 'language' }).of(locale) ?? locale;

/*
 * B6 — the interface language, per browser. The choice goes into the
 * unencrypted `locale` cookie that HandleLocale reads; the reload then brings
 * the new catalogue, whose `i18n` key has changed with the locale.
 */
function switchTo(locale: string): void {
    document.cookie = `locale=${locale}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
    document.documentElement.lang = locale;
    router.reload();
}

export default function LocaleTabs({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { t, locale, locales } = useTranslation();

    return (
        <div
            role="group"
            aria-label={t('Language')}
            className={cn(
                'inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800',
                className,
            )}
            {...props}
        >
            {locales.map((each) => (
                <button
                    key={each}
                    type="button"
                    lang={each}
                    aria-pressed={each === locale}
                    onClick={() => switchTo(each)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 text-sm transition-colors',
                        each === locale
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    {endonym(each)}
                </button>
            ))}
        </div>
    );
}
