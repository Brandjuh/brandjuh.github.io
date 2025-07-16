interface Strings {
  en: Record<string, string>;
  nl: Record<string, string>;
}

export const strings: Strings = {
  en: {
    titleCustom:     'VOP TOOL',
    subtitleCustom:  'By Roel on the ramp',
    progressTitle:   'Progress overview',
    handled:         'Handled',
    markHandled:     'Mark as handled',
    notesPlaceholder:'No notes',
    resetAll:        'Reset all',
    markAll:         'Mark all handled',
    showAll:         'Show all',
    hideAll:         'Hide all',
    remaining:       'remaining',
    vopLabel:        'STAND'
  },
  nl: {
    titleCustom:     'VOP TOOL',
    subtitleCustom:  'By Roel on the ramp',
    progressTitle:   'Voortgang overzicht',
    handled:         'Afgehandeld',
    markHandled:     'Markeer als afgehandeld',
    notesPlaceholder:'Geen notities',
    resetAll:        'Alles resetten',
    markAll:         'Markeer alle afgehandeld',
    showAll:         'Toon alle',
    hideAll:         'Verberg alle',
    remaining:       'resterend',
    vopLabel:        'VOP'
  }
};
