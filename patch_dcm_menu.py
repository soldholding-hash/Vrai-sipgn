# -*- coding: utf-8 -*-
# Patch : eclate le module Communication en entrees du menu lateral.
# Chaque outil devient une entree de navigation a gauche.
# Usage : python patch_dcm_menu.py   (depuis ~/Vrai-sipgn)

import io
import sys

MODULE = "ModuleCommunication.jsx"
APP = "App.jsx"


def lire(chemin):
    f = io.open(chemin, "r", encoding="utf-8")
    c = f.read()
    f.close()
    return c


def ecrire(chemin, contenu):
    f = io.open(chemin, "w", encoding="utf-8")
    f.write(contenu)
    f.close()


def appliquer(src, remplacements, nom_fichier):
    for i, paire in enumerate(remplacements):
        ancien = paire[0]
        nouveau = paire[1]
        n = src.count(ancien)
        if n != 1:
            print("ERREUR " + nom_fichier + " : ancre " + str(i + 1) + " trouvee " + str(n) + " fois.")
            print("Aucune modification effectuee.")
            sys.exit(1)
        src = src.replace(ancien, nouveau)
    return src


# ---------------------------------------------------------------------
# 1. ModuleCommunication.jsx
# ---------------------------------------------------------------------
mod = lire(MODULE)

if "props.vue" in mod:
    print("Le patch est deja applique. Aucune modification.")
    sys.exit(0)

avec_reseaux = "OngletReseaux" in mod

MAGASIN = '''var COULEUR_DCM = "#DB2777";

// Magasin partage : les dossiers du circuit de validation survivent au
// changement d entree de menu (chaque changement remonte le composant).
// A remplacer par la table Supabase dcm_dossiers pour une vraie persistance.
var STORE_DOSSIERS = [];
var ABONNES_DOSSIERS = [];
function publierDossiers(liste) {
  STORE_DOSSIERS = liste;
  for (var i = 0; i < ABONNES_DOSSIERS.length; i++) { ABONNES_DOSSIERS[i](liste); }
}'''

ETAT_DOSSIERS = '''  var dossierState = useState(STORE_DOSSIERS);
  var dossiers = dossierState[0];
  var majDossiers = dossierState[1];
  function setDossiers(liste) { publierDossiers(liste); majDossiers(liste); }

  useEffect(function () {
    ABONNES_DOSSIERS.push(majDossiers);
    return function () {
      var reste = [];
      for (var i = 0; i < ABONNES_DOSSIERS.length; i++) {
        if (ABONNES_DOSSIERS[i] !== majDossiers) { reste.push(ABONNES_DOSSIERS[i]); }
      }
      ABONNES_DOSSIERS = reste;
    };
  }, []);

  useEffect(function () {
    if (props.vue) { setOnglet(props.vue); }
  }, [props.vue]);'''

remplacements_mod = [
    ('var COULEUR_DCM = "#DB2777";', MAGASIN),
    ('  var ongletState = useState("accueil");',
     '  var ongletState = useState(props.vue ? props.vue : "accueil");'),
    ('  var dossierState = useState([]);\n  var dossiers = dossierState[0];\n  var setDossiers = dossierState[1];',
     ETAT_DOSSIERS),
    ('        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4">',
     '        <div className={"gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4 " + (props.vue ? "hidden" : "flex")}>'),
    ('    setDossiers([nouveau].concat(dossiers));\n    setOnglet("validation");',
     '    setDossiers([nouveau].concat(dossiers));\n    if (!props.vue) { setOnglet("validation"); }'),
]

mod = appliquer(mod, remplacements_mod, MODULE)
ecrire(MODULE + ".avant_menu", lire(MODULE))
ecrire(MODULE, mod)
print("ModuleCommunication.jsx : patch applique.")


# ---------------------------------------------------------------------
# 2. App.jsx
# ---------------------------------------------------------------------
app = lire(APP)

if "comveille" in app:
    print("App.jsx : deja patche.")
    sys.exit(0)

ICONES = '''  communication: MonitorPlay,
  comveille: Search,
  compresse: BookOpen,
  comredaction: FileText,
  comstudio: Video,
  commediatheque: Package,
  comreseaux: Shuffle,
  comvalidation: ClipboardCheck,'''

entrees = [
    '    { id: "communication", label: "Tableau de bord" }',
    '    { id: "comveille", label: "Veille & Analyse" }',
    '    { id: "compresse", label: "Synthese Presse" }',
    '    { id: "comredaction", label: "Redaction & Traduction" }',
    '    { id: "comstudio", label: "Studio Video" }',
    '    { id: "commediatheque", label: "Mediatheque" }',
]
if avec_reseaux:
    entrees.append('    { id: "comreseaux", label: "Reseaux Sociaux" }')
entrees.append('    { id: "comvalidation", label: "Circuit de Validation" }')
entrees.append('    { id: "calendrier", label: "Calendrier" }')
entrees.append('    { id: "notes", label: "Notes de Service" }')
entrees.append('    { id: "messagerie", label: "Messagerie" }')
entrees.append('    { id: "appels", label: "Appels SIPGN" }')

NAV = "  communication: [\n" + ",\n".join(entrees) + "\n  ],"

ancien_nav_debut = '  communication: [\n    { id: "communication", label: "Communication & Medias" },'
if ancien_nav_debut not in app:
    print("ERREUR App.jsx : bloc de navigation communication introuvable.")
    sys.exit(1)

debut = app.index(ancien_nav_debut)
fin = app.index("  ],", debut) + len("  ],")
app = app[:debut] + NAV + app[fin:]

vues = [
    ("communication", "accueil"),
    ("comveille", "veille"),
    ("compresse", "presse"),
    ("comredaction", "redaction"),
    ("comstudio", "studio"),
    ("commediatheque", "mediatheque"),
    ("comvalidation", "validation"),
]
if avec_reseaux:
    vues.insert(6, ("comreseaux", "reseaux"))

branches = []
for paire in vues:
    branches.append('  } else if (module === "' + paire[0] + '") {\n' +
                    '    content = <ModuleCommunication compte={compte} vue="' + paire[1] + '" />;')

remplacements_app = [
    ('  communication: MonitorPlay,', ICONES),
    ('  } else if (module === "communication") {\n    content = <ModuleCommunication compte={compte} />;',
     "\n".join(branches)),
]

app = appliquer(app, remplacements_app, APP)
ecrire(APP + ".avant_menu", lire(APP))
ecrire(APP, app)

print("App.jsx : patch applique.")
print("Onglet Reseaux Sociaux inclus : " + ("oui" if avec_reseaux else "non"))
print("Sauvegardes : *.avant_menu")
