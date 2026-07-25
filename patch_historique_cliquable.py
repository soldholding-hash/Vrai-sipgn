import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

# ---- PATCH A: ajouter correspondantId dans les donnees mappees ----
old_a = '''          return {
            id: row.id,
            avec: nomAvec,
            type: estSortant ? "sortant" : "entrant",
            heure: row.created_at ? new Date(row.created_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) : "",
            statut: row.statut
          };'''

new_a = '''          return {
            id: row.id,
            avec: nomAvec,
            correspondantId: estSortant ? row.recepteur : row.appelant,
            type: estSortant ? "sortant" : "entrant",
            heure: row.created_at ? new Date(row.created_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) : "",
            statut: row.statut
          };'''

count_a = c.count(old_a)
print("PATCH A - Occurrences trouvees:", count_a)
if count_a == 1:
    c = c.replace(old_a, new_a)
    print("PATCH A applique: OK")
else:
    print("PATCH A: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    sys.exit(1)

# ---- PATCH B: rendre la ligne d'historique cliquable pour rappeler ----
old_b = '''          ) : historique.map(function(h) {
            return (
              <div key={h.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center gap-3">'''

new_b = '''          ) : historique.map(function(h) {
            return (
              <div key={h.id} onClick={function() {
                var cibleTrouvee = allComptes.filter(function(cc) { return cc.identifiant === h.correspondantId; })[0];
                if (cibleTrouvee) { setOnglet("clavier"); appeler(cibleTrouvee, "audio"); }
              }} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-700/90 active:scale-[0.98] transition">'''

count_b = c.count(old_b)
print("PATCH B - Occurrences trouvees:", count_b)
if count_b == 1:
    c = c.replace(old_b, new_b)
    print("PATCH B applique: OK")
else:
    print("PATCH B: ANCRE NON UNIQUE OU INTROUVABLE - patch A conserve, B ignore")

open(path, "w", encoding="utf-8").write(c)
print("Fichier sauvegarde.")
