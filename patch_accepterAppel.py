import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

old = '''  function accepterAppel() {
    if(!appelEntrant) return;
    supabase.from("appels").update({statut:"en_cours"}).eq("id", appelEntrant.id).then(function(r) {
      if(!r.error) {
        setEnAppel(true);
        setHistorique(function(prev) {
          return [{
            id: appelEntrant.id,
            avec: appelEntrant.appelant_nom,
            type: "entrant",
            heure: new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),
            statut: "accepte"
          }].concat(prev);
        });
      }
    });
  }'''

new = '''  function accepterAppel() {
    if(!appelEntrant) return;
    var idAppel = appelEntrant.id;
    var nomAppelant = appelEntrant.appelant_nom;
    supabase.from("appels").select("*").eq("id", idAppel).limit(1).then(function(rSel) {
      var ligneAppel = rSel.data && rSel.data[0];
      if (!ligneAppel || !ligneAppel.offer_sdp) { return; }
      navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream) {
        localStreamRef.current = stream;
        var pc = new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"}]});
        pcRef.current = pc;
        stream.getTracks().forEach(function(t) { pc.addTrack(t, stream); });
        pc.ontrack = function(e) {
          if (remoteAudioRef.current) { remoteAudioRef.current.srcObject = e.streams[0]; }
        };
        pc.setRemoteDescription(JSON.parse(ligneAppel.offer_sdp)).then(function() {
          return pc.createAnswer();
        }).then(function(answer) {
          return pc.setLocalDescription(answer);
        }).then(function() {
          function envoyerReponseQuandPrete() {
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
          envoyerReponseQuandPrete();
        });
      }).catch(function(){});
    });
  }'''

count = c.count(old)
print("Occurrences trouvees:", count)
if count == 1:
    c = c.replace(old, new)
    open(path, "w", encoding="utf-8").write(c)
    print("Fonction accepterAppel mise a jour: OK")
else:
    print("ATTENTION: ancre non unique ou introuvable, rien applique")
    sys.exit(1)
