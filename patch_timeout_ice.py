import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

# ---- PATCH A: timeout sur envoyerOffreQuandPret ----
old_a = '''            function envoyerOffreQuandPret() {
              if (pc.iceGatheringState === "complete") {
                supabase.from("appels").update({offer_sdp: JSON.stringify(pc.localDescription)}).eq("id", id).then(function(){});
              } else {
                setTimeout(envoyerOffreQuandPret, 300);
              }
            }
            envoyerOffreQuandPret();'''

new_a = '''            var tentativesOffre = 0;
            function envoyerOffreQuandPret() {
              tentativesOffre++;
              if (pc.iceGatheringState === "complete" || tentativesOffre > 13) {
                supabase.from("appels").update({offer_sdp: JSON.stringify(pc.localDescription)}).eq("id", id).then(function(){});
              } else {
                setTimeout(envoyerOffreQuandPret, 300);
              }
            }
            envoyerOffreQuandPret();'''

count_a = c.count(old_a)
print("PATCH A - Occurrences trouvees:", count_a)
if count_a == 1:
    c = c.replace(old_a, new_a)
    print("PATCH A applique: OK")
else:
    print("PATCH A: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    sys.exit(1)

# ---- PATCH B: timeout sur envoyerReponseQuandPrete ----
old_b = '''          function envoyerReponseQuandPrete() {
            if (pc.iceGatheringState === "complete") {
              supabase.from("appels").update({statut:"en_cours", answer_sdp: JSON.stringify(pc.localDescription)}).eq("id", idAppel).then(function(r) {
                if(!r.error) {
                  setEnAppel(true);
                  setHistorique(function(prev) {
                    return [{
                      id: idAppel,
                      avec: nomAppelant,
                      type: "entrant",
                      heure: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),
                      statut: "accepte"
                    }].concat(prev);
                  });
                }
              });
            } else {
              setTimeout(envoyerReponseQuandPrete, 300);
            }
          }
          envoyerReponseQuandPrete();'''

new_b = '''          var tentativesReponse = 0;
          function envoyerReponseQuandPrete() {
            tentativesReponse++;
            if (pc.iceGatheringState === "complete" || tentativesReponse > 13) {
              supabase.from("appels").update({statut:"en_cours", answer_sdp: JSON.stringify(pc.localDescription)}).eq("id", idAppel).then(function(r) {
                if(!r.error) {
                  setEnAppel(true);
                  setHistorique(function(prev) {
                    return [{
                      id: idAppel,
                      avec: nomAppelant,
                      type: "entrant",
                      heure: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),
                      statut: "accepte"
                    }].concat(prev);
                  });
                }
              });
            } else {
              setTimeout(envoyerReponseQuandPrete, 300);
            }
          }
          envoyerReponseQuandPrete();'''

count_b = c.count(old_b)
print("PATCH B - Occurrences trouvees:", count_b)
if count_b == 1:
    c = c.replace(old_b, new_b)
    print("PATCH B applique: OK")
else:
    print("PATCH B: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    open(path, "w", encoding="utf-8").write(c)
    sys.exit(1)

open(path, "w", encoding="utf-8").write(c)
print("Fichier sauvegarde.")
