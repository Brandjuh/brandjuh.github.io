// i18n.ts
interface Strings {
  en: Record<string, string>;
  nl: Record<string, string>;
}

export const strings: Strings = {
  en: {
    title: 'Stand',
    handled: 'Handled',
    markHandled: 'Mark as handled',
    notesPlaceholder: 'No notes',
    resetAll: 'Reset all',
    markAll: 'Mark all handled',
    showAll: 'Show all',
    hideAll: 'Hide all',
    progressTitle: 'Progress overview',
    remaining: 'remaining',
    hiddenVops: 'Hidden stands'
  },
  nl: {
    title: 'VOP',
    handled: 'Afgehandeld',
    markHandled: 'Markeer als afgehandeld',
    notesPlaceholder: 'Geen notities',
    resetAll: 'Alles resetten',
    markAll: 'Markeer alle afgehandeld',
    showAll: 'Toon alle',
    hideAll: 'Verberg alle',
    progressTitle: 'Voortgang overzicht',
    remaining: 'resterend',
    hiddenVops: 'Verborgen VOPs'
  }
};
