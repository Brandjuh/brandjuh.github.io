interface Strings {
  en: Record<string, string>;
  nl: Record<string, string>;
}

export const strings: Strings = {
  en: {
    titleCustom: 'VOP TOOL',
    subtitleCustom: 'By Roel on the ramp',
    vopLabel: 'VOP',
    progressTitle: 'Progress Overview',
    handled: 'Handled',
    markHandled: 'Mark as handled',
    notesPlaceholder: 'No notes',
    resetAll: 'Reset all',
    markAll: 'Mark all handled',
    showAll: 'Show all',
    hideAll: 'Hide all',
    remaining: 'remaining'
  },
  nl: {
    titleCustom: 'VOP TOOL',
    subtitleCustom: 'By Roel on the ramp',
    vopLabel: 'VOP',
    progressTitle: 'Voortgang Overzicht',
    handled: 'Afgehandeld',
    markHandled: 'Markeer als afgehandeld',
    notesPlaceholder: 'Geen notities',
    resetAll: 'Alles resetten',
    markAll: 'Markeer alle afgehandeld',
    showAll: 'Toon alle',
    hideAll: 'Verberg alle',
    remaining: 'resterend'
  }
};
