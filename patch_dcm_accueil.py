# -*- coding: utf-8 -*-
# Patch : tableau de bord DCM en onglet d'accueil du module Communication.
# Usage : python patch_dcm_accueil.py
# A lancer depuis ~/Vrai-sipgn

import io
import sys

CHEMIN = "ModuleCommunication.jsx"

COMPOSANT = '''
// =====================================================================
// 0. TABLEAU DE BORD DE LA DIRECTION DE LA COMMUNICATION
// =====================================================================
function OngletAccueil(props) {
  var dossiers = props.dossiers;
  var allerA = props.allerA;

  var enAttente = dossiers.filter(function (d) {
    return !d.rejete && d.etape !== "publie";
  });
  var publies = dossiers.filter(function (d) { return d.etape === "publie"; });
  var rejetes = dossiers.filter(function (d) { return d.rejete; });

  var indicateurs = [
    { label: "Dossiers en attente de visa", valeur: enAttente.length, sous: "Circuit hierarchique", couleur: COULEUR_DCM },
    { label: "Publications validees", valeur: publies.length, sous: "Diffusion autorisee", couleur: "#16A34A" },
    { label: "Retours a corriger", valeur: rejetes.length, sous: "Rejetes par la hierarchie", couleur: "#DC2626" },
    { label: "Medias en archive", valeur: ASSETS_DEMO.length, sous: "Photos et videos indexees", couleur: "#0EA5E9" }
  ];

  var raccourcis = [
    { cle: "redaction", titre: "Rediger un communique", aide: "Assistant redactionnel institutionnel" },
    { cle: "presse", titre: "Produire la revue de presse", aide: "Synthese du jour pour la hierarchie" },
    { cle: "studio", titre: "Monter une video", aide: "Voix-off, sous-titres, masquage, formats" },
    { cle: "veille", titre: "Analyser la tonalite", aide: "Social listening et signaux faibles" }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {indicateurs.map(function (i) {
          return (
            <div key={i.label} className="relative bg-slate-800 border border-slate-700 rounded-2xl p-4 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: i.couleur }}></div>
              <p className="text-slate-400 text-xs uppercase tracking-wide leading-tight">{i.label}</p>
              <p className="text-3xl font-black mt-1" style={{ color: i.couleur }}>{i.valeur}</p>
              <p className="text-slate-600 text-xs mt-0.5">{i.sous}</p>
            </div>
          );
        })}
      </div>

      <CarteDCM titre="Actions courantes">
        <div className="space-y-2">
          {raccourcis.map(function (r) {
            return (
              <button
                key={r.cle}
                onClick={function () { allerA(r.cle); }}
                className="w-full text-left bg-slate-900 hover:bg-slate-900/60 rounded-xl px-3 py-3 transition"
              >
                <p className="text-white text-sm font-semibold">{r.titre}</p>
                <p className="text-slate-600 text-xs mt-0.5">{r.aide}</p>
              </button>
            );
          })}
        </div>
      </CarteDCM>

      <CarteDCM
        titre="Dossiers en cours"
        sousTitre="Etat du circuit de validation"
        action={
          dossiers.length ? (
            <button onClick={function () { allerA("validation"); }} className="text-slate-400 hover:text-white text-xs font-bold uppercase">
              Tout voir
            </button>
          ) : null
        }
      >
        {dossiers.length ? (
          <div className="space-y-2">
            {dossiers.slice(0, 5).map(function (d) {
              var etiquette = d.rejete ? "Rejete" : d.etape;
              var couleur = d.rejete ? "#DC2626" : (d.etape === "publie" ? "#16A34A" : COULEUR_DCM);
              return (
                <div key={d.id} className="flex items-center justify-between gap-3 bg-slate-900 rounded-xl px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{d.titre}</p>
                    <p className="text-slate-600 text-xs">{d.id} — {d.type}</p>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-bold uppercase shrink-0"
                    style={{ background: couleur + "1A", color: couleur, border: "1px solid " + couleur + "45" }}
                  >
                    {etiquette}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <EtatVide
            titre="Aucun dossier en cours"
            aide="Les communiques rediges et les montages produits apparaissent ici."
          />
        )}
      </CarteDCM>

      <CarteDCM titre="Perimetre de veille" sousTitre="Sources suivies par la direction">
        <div className="flex flex-wrap gap-2">
          {SOURCES_VEILLE.filter(function (s) { return s.actif; }).map(function (s) {
            return (
              <span key={s.id} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 text-xs font-semibold">
                {s.nom}
              </span>
            );
          })}
        </div>
      </CarteDCM>
    </div>
  );
}

'''

ANCRE_COMPOSANT = "// =====================================================================\n// COMPOSANT PRINCIPAL"

REMPLACEMENTS = [
    # 1. Insertion du composant
    (ANCRE_COMPOSANT, COMPOSANT + ANCRE_COMPOSANT),
    # 2. Onglet par defaut
    ('var ongletState = useState("veille");',
     'var ongletState = useState("accueil");'),
    # 3. Entree dans la liste des onglets
    ('  var ONGLETS = [\n    { cle: "veille", label: "Veille" },',
     '  var ONGLETS = [\n    { cle: "accueil", label: "Tableau de bord" },\n    { cle: "veille", label: "Veille" },'),
    # 4. Rendu de l onglet
    ('        {onglet === "veille" ? <OngletVeille /> : null}',
     '        {onglet === "accueil" ? <OngletAccueil dossiers={dossiers} allerA={setOnglet} /> : null}\n        {onglet === "veille" ? <OngletVeille /> : null}'),
]


def main():
    try:
        f = io.open(CHEMIN, "r", encoding="utf-8")
        src = f.read()
        f.close()
    except IOError:
        print("ERREUR : " + CHEMIN + " introuvable. Lancez le script depuis ~/Vrai-sipgn")
        sys.exit(1)

    if "OngletAccueil" in src:
        print("Le patch est deja applique. Aucune modification.")
        sys.exit(0)

    for i, paire in enumerate(REMPLACEMENTS):
        ancien = paire[0]
        nouveau = paire[1]
        if src.count(ancien) != 1:
            print("ERREUR : ancre " + str(i + 1) + " introuvable ou ambigue (" + str(src.count(ancien)) + " occurrence(s)).")
            print("Aucune modification effectuee.")
            sys.exit(1)
        src = src.replace(ancien, nouveau)

    sauvegarde = io.open(CHEMIN + ".bak", "w", encoding="utf-8")
    f = io.open(CHEMIN, "r", encoding="utf-8")
    sauvegarde.write(f.read())
    f.close()
    sauvegarde.close()

    f = io.open(CHEMIN, "w", encoding="utf-8")
    f.write(src)
    f.close()

    print("Patch applique. Sauvegarde : " + CHEMIN + ".bak")
    print("Le module s ouvre desormais sur le tableau de bord DCM.")


main()
