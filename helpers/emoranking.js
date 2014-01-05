function getRanking(desc) { 
  // Función para obtener un ranking de acuerdo a la opinión del usuario vertida en el comentario var ranking = 0; // ranking default -0 significa "no definido" 
  var regexp = /:D|:\/|:\)|:\(/g ; 
  //definimos los caracteres a matchear 
  var opinion = desc.match(regexp); 
  var ranking = -0; 
  if (Array.isArray(opinion)) { 
    switch (opinion[0]) { 
      case ":D": 
        ranking = 1; 
        break; 
      case ":)": 
        ranking = 2; 
        break; 
      case ":/": 
        ranking = 3; 
        break; 
      case ":(": 
        ranking = 4; 
        break; 
    } 
  } 
    return ranking; 
}

module.exports = {
  get: getRanking
};
